import React, { useState } from "react";
import * as Api from "../../api";
import {
    Box,
    TextField,
    Stack,
    Button,
  } from "@mui/material";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
          const newAward = {
            userId: portfolioOwnerId,
            title,
            description
            
          };
          await Api.post("award/create", newAward);
    
          const res = await Api.get("award/list", portfolioOwnerId);
          setAwards(res.data);
          setIsAdding(false);
        } catch (error) {
          alert(error.response.data);
        }
      }
    
    

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Stack spacing={2}>
                <TextField
                    required
                    label="수상내역"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <TextField
                    required
                    label="상세내역"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Stack>

            <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2, justifyContent: "center" }}
            >
                <Button variant="contained" type="submit" sx={{ bgcolor: "#08075C" }}>
                    확인
                </Button>{" "}
                <Button
                    type="reset"
                    onClick={() => setIsAdding(false)}
                    variant="outlined"
                    color="error"
                >
                취소
                </Button>{" "}
            </Stack>
        </Box>
    );
}

export default AwardAddForm;
