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
    public void createUser(String username, String password) throws InvalidKeySpecException, NoSuchAlgorithmException {
        User user = new User();
        user.username = username;
        user.password = PasswordHash.createHash(password);
        users.save(user);
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public void login(HttpSession session, String username, String password) throws Exception {
        User user = users.findOneByUsername(username);
        if (user == null){

        }
        else if (!PasswordHash.validatePassword(password, user.password)) {
            wrongPassword();
        }
        else {
            loginSuccess();
            session.setAttribute("username", username);
        }
    }

    @RequestMapping (path = "/createSave", method = RequestMethod.POST)
    public void saveGame(HttpSession session, String username, String name){

    }

    public static String wrongPassword(){
        String wrongPassword = "Wrong password";
        return wrongPassword;
    }

    public static String invalidUser(){
        String invalidUser = "Invalid user";
        return invalidUser;
    }

    public static String loginSuccess(){
        String loginSuccess = "Login success";
        return loginSuccess;
    }

}
