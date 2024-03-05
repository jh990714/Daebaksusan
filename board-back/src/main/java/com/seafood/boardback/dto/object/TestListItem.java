package com.seafood.boardback.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TestListItem {
    private int userId;
    private int id;
    private String title;
    private String body;
}
