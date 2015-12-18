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

    @Column(nullable = false)
    public int level;

    @Column(nullable = false)
    public int score;

    @Column(nullable = false)
    public int healthPotion;

    @Column(nullable = false)
    public int firePotion;

    @Column(nullable = false)
    public int shieldPotion;

    @Column(nullable = false)
    public int health;

    @ManyToOne
    public User user;

}
