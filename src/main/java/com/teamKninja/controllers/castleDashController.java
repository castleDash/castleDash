package com.teamKninja.controllers;

import com.teamKninja.entities.Level;
import com.teamKninja.entities.Save;
import com.teamKninja.entities.User;
import com.teamKninja.services.LevelRepository;
import com.teamKninja.services.SaveRepository;
import com.teamKninja.services.UserRepository;
import com.teamKninja.util.PasswordHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

/**
 * Created by holdenhughes on 12/10/15.
 */
@RestController
public class castleDashController {
    @Autowired
    UserRepository users;

    @Autowired
    SaveRepository saves;

    @Autowired
    LevelRepository levels;

    @PostConstruct
    public void init() throws Exception {
        if (users.count() >0) {
            return;
        } else {
            User user = new User();
            user.username = "Henry";
            user.password = PasswordHash.createHash("Grenry");
            users.save(user);
                while (saves.findAllByUser(user).size()<3){
                    Save save = new Save();
                    save.level = 0;
                    save.firePotion = 3;
                    save.healthPotion = 3;
                    save.shieldPotion = 3;
                    save.score =0;
                    save.user = user;
                    saves.save(save);
                }
            for (int i=1; i<2; i++){ //This loop will populate the levels based on the number set at i
                String levelNum = String.valueOf(i);
                for (int j =1; j<4; j++){ //This loop will populate based on the number of j "version number"
                    Level level = new Level();
                    String verNum = String.valueOf(j);
                    String filename = "level"+levelNum+"v"+verNum+".json"; // builds the filename
                    String fileContent = readFile(filename);
                    level.levelCode = fileContent;
                    level.levelNumber = i;
                    level.version = j;
                    levels.save(level);

                }
            }
        }
    }

    @RequestMapping(path = "/createUser", method = RequestMethod.POST)
    public String createUser(String username, String password) throws InvalidKeySpecException, NoSuchAlgorithmException {
        User user = users.findOneByUsername(username);
        if (user == null) {
            if (password == null){
                return "Empty password field";
            } else {
                user = new User();
                user.username = username;
                user.password = PasswordHash.createHash(password);
                users.save(user);
                return "success";
            }
        } else{
            return "User already exists";
        }
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public String login(HttpSession session, String username, String password) throws Exception {
        User user = users.findOneByUsername(username);
        if (user == null){
            return "Invalid users";
        } else if (!PasswordHash.validatePassword(password, user.password)) {
            return "Wrong password";
        } else {
            session.setAttribute("username", username);
            return "success";
        }
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public String logout(HttpSession session, HttpServletResponse response) throws IOException {
        session.invalidate();
        response.sendRedirect("/");
        return "success";
    }

    @RequestMapping (path = "/createSave", method = RequestMethod.POST)
    public String createSave(HttpSession session) throws Exception {
        String username =(String) session.getAttribute("username");
        User user = users.findOneByUsername(username);
        if (username == null){
            return "not logged in";
        } else {
            List<Save> saveList = saves.findAllByUser(user);
            if (saveList.size() < 3){
                Save save = new Save();
                save.level = 1;
                save.firePotion = 3;
                save.healthPotion = 3;
                save.shieldPotion = 3;
                saves.save(save);
                return "success";
            } else {
                return "too many saves";
            }
        }
    }

    @RequestMapping (path = "/saveList", method = RequestMethod.GET)
    public List savesList(HttpSession session){
        String username =(String) session.getAttribute("username");
        User user = users.findOneByUsername(username);
        List<Save> saveList = saves.findAllByUser(user);
        return saveList;
    }

   @RequestMapping (path = "/selectSave", method = RequestMethod.POST)
    public String selectSave(HttpSession saveSession, int id){
        Save save = saves.findOneById(id);
        saveSession.setAttribute("id", save);
        return "success";
    }

    @RequestMapping(value = "/exitSave", method = RequestMethod.POST)
    public String exitSave(HttpSession saveSession) throws IOException {
        saveSession.setAttribute("id", null);
        return "success";
    }

    @RequestMapping (path = "/saveGame", method = RequestMethod.POST)
    public String saveGame(HttpSession saveSession, int level, int healthPotion, int shieldPotion,
                           int firePotion, int health) {
        int id = (int) saveSession.getAttribute("id");
        Save tempSave = saves.findOneById(id);
        tempSave.level = level;
        tempSave.healthPotion = healthPotion;
        tempSave.shieldPotion = shieldPotion;
        tempSave.firePotion = firePotion;
        tempSave.health = health;
        saves.save(tempSave);
        return "success";
    }

    static String readFile(String fileName) {
        File f = new File(fileName);
        try {
            FileReader fr = new FileReader(f);
            int fileSize = (int) f.length();
            char[] fileContent = new char[fileSize];
            fr.read(fileContent);
            return new String(fileContent);
        } catch (Exception e) {
            return null;
        }
    }
}
