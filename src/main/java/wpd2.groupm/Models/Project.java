package wpd2.groupm.Models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class Project {
    private int id;
    private String name, description;
    private Date ExpectedDone, actualDone;
    private List<Milestone> milestones;

    public Project() {
        Random rand = new Random();
        this.id = rand.nextInt(100000);
    }
    public Project(String name,String description) {
        this.name = name;
        this.description = description;
        this.milestones = new ArrayList<>();
    }
    public Project(String name,String description,int id) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.milestones = new ArrayList<>();
    }
    public Project(String name,String description,int id,List<Milestone> milestones) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.milestones = milestones;
    }

    public List<Milestone> getmilestones() {
        return milestones;
    }

    public void setmilestones(List<Milestone> milestones) {
        this.milestones = milestones;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getExpectedDone() {
        return ExpectedDone;
    }

    public void setExpectedDone(Date expectedDone) {
        ExpectedDone = expectedDone;
    }

    public Date getActualDone() {
        return actualDone;
    }

    public void setActualDone(Date actualDone) {
        this.actualDone = actualDone;
    }
}
