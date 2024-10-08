package br.vianna.edu.academia.controller.actions.imp;

import br.vianna.edu.academia.model.ETipoUsuario;
import br.vianna.edu.academia.model.User;
import br.vianna.edu.academia.model.dao.imp.UserDAO;
import br.vianna.edu.academia.util.UtilService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CallAltSaveUser implements br.vianna.edu.academia.controller.actions.ICommanderAction {
    @Override
    public boolean ehPublico() {
        return true;
    }

    @Override
    public void executar(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        User u = (User) req.getSession().getAttribute("user");

        u.setNome( req.getParameter("cpNome") );
        u.setEmail( req.getParameter("cpEmail") );
        u.setLogin( req.getParameter("cpLogin") );
        u.setSenha(UtilService.md5(req.getParameter("cpSenha"))  );
        u.setTipo(ETipoUsuario.USER);
        if (u.getSenha() == null || u.getSenha().isEmpty() ||
                u.getSenha().isBlank() ||
                ! u.getSenha().equals( UtilService.md5(req.getParameter("cpNewSenha"))  )){
            req.setAttribute("ac", "cadUser");
            req.setAttribute("error", "As senha devem ser iguais");
            new CallViewAction().executar(req, resp);
        }
        new UserDAO().alterar(u);

        new HomeAction().executar(req, resp);
    }
}
