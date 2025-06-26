package com.example.kshitiz.server.services;

import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.repositories.JobRepository;
import com.example.kshitiz.server.services.JobServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

public class JobServiceImplTest {

    @Mock
    private JobRepository jobRepository;

    @InjectMocks
    private JobServiceImpl jobService;

    private Job job;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        job = new Job();
        job.setId(1L);
        job.setJobTitle("Developer");
        job.setLocation("Colombo");
        job.setPostedOn(LocalDate.now());
    }

    @Test
    void testCreateJob() {
        when(jobRepository.save(job)).thenReturn(job);
        Job saved = jobService.createJob(job);
        assertNotNull(saved);
        verify(jobRepository, times(1)).save(job);
    }

    @Test
    void testGetAllJobs() {
        when(jobRepository.findAll()).thenReturn(Arrays.asList(job));
        List<Job> jobs = jobService.getAllJobs();
        assertEquals(1, jobs.size());
    }
}
