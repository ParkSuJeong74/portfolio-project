import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from "@mui/material";

//checkDeleteComplete 삭제를 확인하는 함수를 프랍으로 전달
export default function AlertDialog({ checkDeleteComplete }) {
    const [open, setOpen] = useState(true);

    //삭제버튼
    const handleClickDelete = () => {
        handleClose();
        checkDeleteComplete(true);
    };
    //취소버튼
    const handleClickCancel = () => {
        handleClose();
        checkDeleteComplete(false);
    };
    //기타 위치 클릭으로 취소
    const handleClose = () => {
        setOpen(false);
        checkDeleteComplete(false);
    };

    return (
    <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>삭제 확인</DialogTitle>
            <DialogContent>
                <DialogContentText>정말 삭제하시겠습니까?</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
                <Stack direction="row" spacing={2} sx={{ height: "35px" }}>
                <Button onClick={handleClickDelete} sx={ButtonStyle.confirm}>
                    삭제
                </Button>
                <Button onClick={handleClickCancel} sx={ButtonStyle.cancel}>
                    취소
                </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    </div>
    );
}

const ButtonStyle = {
    confirm: {
        bgcolor: "#D0CE7C",
        color: "#31311C",
        ":hover": {
            bgcolor: "#b1b068",
            color: "white",
        },
    },
    cancel: {
        border: "solid 1px #db3f2b",
        color: "#db3f2b",
        ":hover": {
            bgcolor: "#bd3421",
            color: "white",
            border: "0px",
        },
    },
};
