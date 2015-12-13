package com.teamKninja.entities;

import javax.persistence.*;

/**
 * Created by holdenhughes on 12/10/15.
 */
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    public String username;

    @Column(nullable = false)
    public String password;
}
