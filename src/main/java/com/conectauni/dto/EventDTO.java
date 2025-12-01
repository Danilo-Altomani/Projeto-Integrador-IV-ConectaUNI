package com.conectauni.dto;

import java.time.Instant;

public class EventDTO {
    public Long id;
    public String title;
    public String description;
    public Instant startAt;
    public Instant endAt;
    public String location;
    public Double budget;
    public Long creatorId;
}
