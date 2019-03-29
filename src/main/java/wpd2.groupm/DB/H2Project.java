package wpd2.groupm.DB;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wpd2.groupm.Models.Milestone;
import wpd2.groupm.Models.Project;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


public class H2Project implements AutoCloseable {
    @SuppressWarnings("unused")
    static final Logger LOG = LoggerFactory.getLogger(H2Project.class);

    public static final String MEMORY = "jdbc:h2:mem:shop";
    public static final String FILE = "jdbc:h2:~/shop";

    private Connection connection;

    static Connection getConnection(String db) throws SQLException, ClassNotFoundException {
        Class.forName("org.h2.Driver");  // ensure the driver class is loaded when the DriverManager looks for an installed class. Idiom.
        return DriverManager.getConnection(db, "sa", "");  // default password, ok for embedded.
    }

    public H2Project() {
        this(MEMORY);
    }

    public H2Project(String db) {
        try {
            connection = getConnection(db);
            loadResource("/project.sql");
        } catch (ClassNotFoundException | SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void close() {
        try {
            if (connection != null) {
                connection.close();
                connection = null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void addProject(Project project) {
        LOG.info("Project added");
        final String ADD_PERSON_QUERY = "INSERT INTO project (name,desc) VALUES (?,?)";
        try (PreparedStatement ps = connection.prepareStatement(ADD_PERSON_QUERY)) {
            ps.setString(1, project.getName());
            ps.setString(2, project.getDescription());
            ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Project> findProject() {
        final String LIST_PERSONS_QUERY = "SELECT name, desc , id FROM project";
        List<Project> out = new ArrayList<>();
        try (PreparedStatement ps = connection.prepareStatement(LIST_PERSONS_QUERY)) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                List<Milestone> m = findMilestone();
                List<Milestone> m1= new ArrayList<>();
                    for (Milestone temp : m) {
                        if(temp.getPid() ==  rs.getInt(3))
                        {
                            m1.add(temp);
                        }
                }
                    LOG.info(String.valueOf(m1.size()));
                out.add(new Project(rs.getString(1),rs.getString(2) , rs.getInt(3),m1));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return out;
    }
    public void addmilestone(Milestone milestone) {
        LOG.info("Project added");
        final String ADD_MILESTONE_QUERY = "INSERT INTO milestone (name,desc,pid) VALUES (?,?,?)";
        try (PreparedStatement ps = connection.prepareStatement(ADD_MILESTONE_QUERY )) {
            ps.setString(1, milestone.getName());
            ps.setString(2, milestone.getDescription());
            ps.setInt(3, milestone.getPid());
            ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Milestone> findMilestone() {
        final String LIST_MILESTONES_QUERY = "SELECT name, desc , id , pid FROM milestone";
        List<Milestone> out = new ArrayList<>();
        try (PreparedStatement ps = connection.prepareStatement(LIST_MILESTONES_QUERY)) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                out.add(new Milestone(rs.getString(1),rs.getString(2) , rs.getInt(3), rs.getInt(4)));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return out;
    }
    private void loadResource(String name) {
        try {
            String cmd = new Scanner(getClass().getResource(name).openStream()).useDelimiter("\\Z").next();
            PreparedStatement ps = connection.prepareStatement(cmd);
            ps.execute();
        } catch (SQLException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}