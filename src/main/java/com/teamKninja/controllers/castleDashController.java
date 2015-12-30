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
import java.security.AllPermission;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
            User user1 = new User();
            user1.username = "Henry";
            user1.password = PasswordHash.createHash("Grenry");
            users.save(user1);
            User user2 = new User();
            user2.username = "Brandon";
            user2.password = PasswordHash.createHash("brandon");
            users.save(user2);
            Save save1 = new Save();
            save1.level = 2;
            save1.score =0;
            save1.user = user2;
            saves.save(save1);
            int i = 1;
                while (saves.findAllByUser(user1).size()<3){
                    Save save = new Save();
                    save.level = i;
                    save.score =0;
                    save.user = user1;
                    saves.save(save);
                    i++;
                }
            for (int a=1; a<4; a++){ //This loop will populate the levels based on the number set at i
                String levelNum = String.valueOf(a);
                for (int j =1; j<4; j++){ //This loop will populate based on the number of j "version number"
                    Level level = new Level();
                    String verNum = String.valueOf(j);
                    String filename = "level"+levelNum+"v"+verNum+".json"; // builds the filename
                    String fileContent = readFile(filename);
                    level.levelCode = fileContent;
                    level.levelNumber = a;
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
            if (username == null || username == ""){
                return "Empty username field";
            } else if (password == null || password == ""){
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
    public String logout(HttpSession session, HttpServletResponse response, HttpSession saveSession) throws IOException {
        saveSession.setAttribute("id", null);
        session.invalidate();
        response.sendRedirect("/");
        return "success";
    }

    @RequestMapping (path = "/createSave", method = RequestMethod.POST)
    public Save createSave(HttpSession session) throws Exception {
        String username =(String) session.getAttribute("username");
        User user = users.findOneByUsername(username);
        List<Save> saveList = saves.findAllByUser(user);
        Save save = new Save();
        save.level = 1;
        save.user = user;
        saves.save(save);
        return save;
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
        saveSession.setAttribute("id", save.id);
        return "success";
    }

    @RequestMapping (path = "/deleteSave", method = RequestMethod.POST)
    public String deleteSave(int id){
        Save save = saves.findOneById(id);
        saves.delete(save);
        return "success";
    }

    @RequestMapping(value = "/exitSave", method = RequestMethod.POST)
    public String exitSave(HttpSession saveSession) throws IOException {
        saveSession.setAttribute("id", null);
        return "success";
    }

    @RequestMapping (path = "/saveGame", method = RequestMethod.POST)
    public String saveGame(HttpSession saveSession, int level, int score) {
        int id = (int) saveSession.getAttribute("id");
        Save tempSave = saves.findOneById(id);
        tempSave.level = level;
        tempSave.score = score;
        saves.save(tempSave);
        return "success";
    }

    @RequestMapping (path = "/levelData", method = RequestMethod.GET)
    public List<Level> levelList(){
        List<Level> finalList = new ArrayList<>();
        for (int i =1; i <4; i++){ // i < x needs to be changed for the number of levels. i < 4 means there are 3 levels
            Random rn = new Random();
            int randVersion = rn.nextInt(2) + 1;
            List<Level> tempList = levels.findAllByLevelNumber(i);
            Level randomLevel = tempList.get(randVersion);
            finalList.add(randomLevel);
        }
        return finalList;
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
