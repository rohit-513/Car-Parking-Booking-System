package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Register
 */
@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Register() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String FirstName = request.getParameter("Uname");		
		String Email = request.getParameter("email");
		String Number = request.getParameter("number");
		String Password = request.getParameter("pass");
		String ConfirmPassword = request.getParameter("Cpass");
		String Gender = request.getParameter("RadioButton");
		
	    PrintWriter out = response.getWriter();
						
	 Connection con = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/anup","root","Root123#");
			
			// check if user is already registered
			
			PreparedStatement pstmt1 = con.prepareStatement("select * from Register where Email = ?");
			
			pstmt1.setString(1,Email);
			
			ResultSet rs = pstmt1.executeQuery();
			Boolean alreadyRegistered = false;
			
			if(rs.next()) {
				alreadyRegistered = true;
			}
			
			if(alreadyRegistered) {
				out.print("Registerd");
			}
			else{
				PreparedStatement pstmt = con.prepareStatement("insert into Register values(?,?,?,?,?,?)");
				
				pstmt.setString(1,FirstName);				
				pstmt.setString(2,Email);
				pstmt.setString(3,Number);
				pstmt.setString(4,Password);
				pstmt.setString(5,ConfirmPassword);
				pstmt.setString(6,Gender);
				
				int rowsUpdated = pstmt.executeUpdate();
				
				if(rowsUpdated == 1) {
					out.print("Successful");
				}else {
					out.print("Failed");
				}
			}
			
		}

	catch(Exception e) {
			System.out.println(e);
		}finally {
			if(con != null) {
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
