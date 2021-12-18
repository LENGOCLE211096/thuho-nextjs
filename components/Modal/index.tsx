import { Box, Typography } from "@material-ui/core"
import Modal from "@material-ui/core/Modal"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import React from "react"

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      padding: 20,
      height: "100vh",
      outline: "none",
      //   overflow: "scroll",
    },
    icon: {
      fontSize: 10,
      marginTop: 7,
      marginRight: 8,
      marginLeft: 18,
    },
    closeIcon: {
      position: "absolute",
      right: 20,
      fontSize: 25,
    },
    title: {
      textAlign: "center",
      fontWeight: 550,
      fontSize: 20,
      margin: "20px 0",
    },
    contentText: {
      textAlign: "justify",
    },
  })
)

interface IProps {
  open: boolean
  handleModal: () => void
}

export default function SimpleModal(props: IProps) {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const { open, handleModal } = props

  return (
    <Box>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box style={modalStyle} className={classes.paper}>
          <Box>
            <CloseIcon onClick={handleModal} className={classes.closeIcon} />
            <Typography className={classes.title}>
              Hướng dẫn thanh toán
            </Typography>
            <Typography className={classes.contentText}>
              1. Chọn nhà cung cấp (Chọn trường học cần thanh toán học phí):
            </Typography>
            <Box display="flex">
              <FiberManualRecordIcon className={classes.icon} />
              <Typography className={classes.contentText}>
                Lựa chọn trường học cần thanh toán trong danh sách.
              </Typography>
            </Box>
            <Typography>2. Chọn loại phí:</Typography>
            <Box display="flex">
              <FiberManualRecordIcon className={classes.icon} />
              <Typography className={classes.contentText}>
                Chọn loại học phí cần thanh toán.
              </Typography>
            </Box>
            <Typography>3. Mã khách hàng:</Typography>
            <Box display="flex">
              <FiberManualRecordIcon className={classes.icon} />
              <Typography className={classes.contentText}>
                Nhập mã sinh viên/ mã nhập học/ mã học sinh/ mã thanh toán… do
                nhà trường cung cấp.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
