package com.teamKninja.entities;

import org.hibernate.annotations.Columns;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by holdenhughes on 12/17/15.
 */
@Entity
@Table(name = "levels")
public class Level {
    @Id
    @GeneratedValue
    int id;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    public String levelCode;

    @Column
    public int levelNumber;

    @Column
    public int version;

}
