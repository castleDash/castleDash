package com.teamKninja.entities;

import javax.persistence.*;

/**
 * Created by holdenhughes on 12/10/15.
 */
@Entity
@Table(name = "saves")
public class Save {
    @Id
    @GeneratedValue
    int id;

    //@Column(nullable = false)
    int level;

    //@Column(nullable = false)
    String name;

    //@Column(nullable = false)
    String swordName;

    //@Column(nullable = false)
    String rangeName;

    //@Column(nullable = false)
    int healthPotion;

    //@Column(nullable = false)
    int shieldPotion;

    //@Column(nullable = false)
    int firePotion;

    //@Column(nullable = false)
    int currency;

    //@Column(nullable = false)
    int health;

    @ManyToOne
    public User user;

}
