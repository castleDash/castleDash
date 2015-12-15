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
    public void init() throws InvalidKeySpecException, NoSuchAlgorithmException {
        if (users.count() >0) {
            return;
        }else {
            User user = new User();
            user.username = "Henry";
            user.password = PasswordHash.createHash("Grenry");
            users.save(user);
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

        }
        else if (!PasswordHash.validatePassword(password, user.password)) {
            return "Wrong password";
        }
        else {
            session.setAttribute("username", username);
            return "success";
        }
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
                save.health = 3;
                save.currency = 100;
                save.firePotion = 3;
                save.healthPotion = 3;
                save.swordName = "sword";
                save.rangeName = "shuriken";
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
    public String selectSave(HttpSession session, int id){
        Save save = saves.findOneById(id);
        session.setAttribute("id", save);
        return "success";
    }

}
