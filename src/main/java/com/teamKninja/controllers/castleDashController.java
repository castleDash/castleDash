package com.teamKninja.controllers;

import com.teamKninja.entities.Save;
import com.teamKninja.entities.User;
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
                    save.name = "RenegadeLima";
                    save.level = 0;
                    save.firePotion = 3;
                    save.healthPotion = 3;
                    save.shieldPotion = 3;
                    save.swordName = "sword";
                    save.user = user;
                    saves.save(save);
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
    public String createSave(HttpSession session, String name) throws Exception {
        String username =(String) session.getAttribute("username");
        User user = users.findOneByUsername(username);
        if (username == null){
            throw new Exception("Not logged in");
        } else {
            List<Save> saveList = saves.findAllByUser(user);
            if (saveList.size() < 3){
                Save save = new Save();
                save.name = name;
                save.level = 0;
                save.firePotion = 3;
                save.healthPotion = 3;
                save.shieldPotion = 3;
                save.swordName = "sword";
                saves.save(save);
                return "success";
            } else {
                return "too many saves";
            }
        }
    }

    @RequestMapping (path = "/savesList", method = RequestMethod.GET)
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
    public String saveGame(HttpSession saveSession,
                           int level,
                           int healthPotion,
                           int shieldPotion,
                           int firePotion,
                           int currency) {
        int id = (int) saveSession.getAttribute("id");
        Save tempSave = saves.findOneById(id);
        tempSave.level = level+1;
        tempSave.healthPotion = healthPotion;
        tempSave.shieldPotion = shieldPotion;
        tempSave.firePotion = firePotion;
        saves.save(tempSave);
        return "success";
    }
}
