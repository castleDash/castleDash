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
    public int id;

    @Column(nullable = false)
    int idNum;

    @Column(nullable = false)
    public int level;

    @Column(nullable = false)
    public int score;

    @ManyToOne
    public User user;

}
