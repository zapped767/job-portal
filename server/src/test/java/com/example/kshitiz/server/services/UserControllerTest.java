package com.example.kshitiz.server.services;

import com.example.kshitiz.server.controllers.UserController;
import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.UserDTO;
import com.example.kshitiz.server.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testRegisterUser() throws Exception {
        UserDTO user = new UserDTO();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setPassword("123456");
        user.setName("Leo");
        user.setAccountType(AccountType.APPLICANT); // ✅ required for conversion to entity

        when(userService.registerUser(any(UserDTO.class))).thenReturn(user);

        mockMvc.perform(post("/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andDo(print()) // Debug the full request/response
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("test@example.com")); // ✅ Now this should succeed
    }


}
