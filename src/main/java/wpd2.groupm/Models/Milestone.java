package wpd2.groupm.Models;

import java.util.Date;

public class Milestone {
    private String Name,description;
    private int id,pid;
    private Date Milestonedue, milestoneActualDone;
    private Project p;

    public Milestone(String name, String description,int pid) {
        this.Name = name;
        this.description = description;
        this.pid = pid;
    }

    public Milestone(String name, String description, int id , int pid) {
        this.Name = name;
        this.description = description;
        this.id = id;
        this.pid = pid;
    }


    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getMilestonedue() {
        return Milestonedue;
    }

    public void setMilestonedue(Date milestonedue) {
        Milestonedue = milestonedue;
    }

    public Date getMilestoneActualDone() {
        return milestoneActualDone;
    }

    public void setMilestoneActualDone(Date milestoneActualDone) {
        this.milestoneActualDone = milestoneActualDone;
    }
}
