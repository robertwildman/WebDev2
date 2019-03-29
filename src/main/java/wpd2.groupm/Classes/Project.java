package wpd2.groupm.Classes;

import java.util.Date;
import java.util.Random;

public class Project {
    private int id;
    private String name, description;
    private Date ExpectedDone, actualDone;

    public Project() {
        Random rand = new Random();
        this.id = rand.nextInt(100000);
    }
    public Project(String name) {
        this.name = name;
        Random rand = new Random();
        this.id = rand.nextInt(100000);
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
