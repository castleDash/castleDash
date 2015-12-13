package com.teamKninja;

import com.teamKninja.services.SaveRepository;
import com.teamKninja.services.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = CastleDashApplication.class)
@WebAppConfiguration
public class CastleDashApplicationTests {
	@Autowired
	UserRepository users;

	@Autowired
	SaveRepository saves;

	@Autowired
	WebApplicationContext wap;

	MockMvc mockMvc;

	@Before
	public void before(){
		saves.deleteAll();
		users.deleteAll();
		mockMvc = MockMvcBuilders.webAppContextSetup(wap).build();
	}

	@Test
	public void testCreateUser() throws Exception {
		mockMvc.perform(
				MockMvcRequestBuilders.post("/createUser")
						.param("username", "testUser")
						.param("password", "testPass")
		);
		assertTrue(users.count() >= 1);
	}


}
