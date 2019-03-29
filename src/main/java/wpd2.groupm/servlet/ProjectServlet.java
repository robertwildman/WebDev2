package wpd2.groupm.servlet;

import wpd2.groupm.Classes.Project;
import wpd2.groupm.DB.H2Project;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ProjectServlet extends BaseServlet {


    //good practice to declare the template that is populated as a constant, why?
    //declare your template here
    private static final String MESSAGE_BOARD_TEMPLATE = "mb.mustache";
    //auto generated, so that servlet can be serialized
    private final H2Project h2Project;
    private static final long serialVersionUID = 687117339002032958L;

    public ProjectServlet(H2Project h2Project) {
        this.h2Project = h2Project;
    }

    //right now, setting the data for the page by hand, later that comes from a data store
    private Object getObject() {
        Map<String, Object> context = new HashMap<>();
        context.put("project", h2Project.findProject());
        LOG.info(h2Project.findProject().toString());
        return context;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        showView(response, MESSAGE_BOARD_TEMPLATE, getObject());
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        Project project = new Project(name);
        h2Project.addProject(project);
        response.sendRedirect("/");
    }
}

