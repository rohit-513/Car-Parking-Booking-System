package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import bean.SlotBean;

/**
 * Servlet implementation class Slot
 */
@WebServlet("/Slot")
public class Slot extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Slot() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		
		 Connection con = null;
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				con = DriverManager.getConnection("jdbc:mysql://localhost:3306/anup","root","Root123#");
			    
				String query = "select * from slots where status='Active' and slot not in (select slot_number from Booking where status='Active')";
	
				Statement st = con.createStatement();
				
				ResultSet rs = st.executeQuery(query);
				
				List<SlotBean> slotBeanList = new ArrayList<SlotBean>();
				
				while(rs.next()) {
					SlotBean slotObj = new SlotBean();
					
					slotObj.setId(rs.getInt("id"));
					slotObj.setParking_id(rs.getInt("parking_id"));
					slotObj.setStatus(rs.getString("status"));
					slotObj.setSlot(rs.getInt("slot"));
					
					slotBeanList.add(slotObj);					
				}
				
				if(slotBeanList.size() > 0) {
					ObjectMapper Obj = new ObjectMapper();
					 String jsonStr = Obj.writeValueAsString(slotBeanList) ;
					out.print(jsonStr);
				}else {
					out.print("NO_RECORD_FOUND");
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
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
