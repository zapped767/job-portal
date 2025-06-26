package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.entity.Applicant;
import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.ApplicantRepository;
import com.example.kshitiz.server.repositories.JobRepository;
import com.example.kshitiz.server.repositories.UserRepository;
import com.example.kshitiz.server.services.ApplicantServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class ApplicantServiceImplTest {

    @Mock
    private ApplicantRepository applicantRepository;

    @Mock
    private JobRepository jobRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ApplicantServiceImpl applicantService;

    private Applicant applicant;
    private User user;
    private Job job;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        job = new Job();
        job.setId(1L);

        user = new User();
        user.setEmail("test@example.com");
        user.setAccountType(AccountType.APPLICANT);

        applicant = new Applicant();
        applicant.setEmail("test@example.com");
        applicant.setJob(job);
    }

    @Test
    public void testApplyJob_Success() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        when(jobRepository.findById(1L)).thenReturn(job);
        when(applicantRepository.findByEmailAndJob("test@example.com", job)).thenReturn(Optional.empty());
        when(applicantRepository.save(any(Applicant.class))).thenReturn(applicant);

        Applicant result = applicantService.applyJob(applicant);

        assertNotNull(result);
        verify(applicantRepository, times(1)).save(applicant);
    }

    @Test
    public void testApplyJob_AlreadyApplied_ThrowsException() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        when(jobRepository.findById(1L)).thenReturn(job);
        when(applicantRepository.findByEmailAndJob("test@example.com", job)).thenReturn(Optional.of(applicant));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            applicantService.applyJob(applicant);
        });

        assertEquals("Applicant has applied already!", exception.getMessage());
    }
}
