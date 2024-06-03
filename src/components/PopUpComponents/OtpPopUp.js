import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import OTP from '../../FunctionalComponents/LoginPage/ForgotPassswordLayout/otp';
import { Flex } from 'antd';
import Column from 'antd/es/table/Column';
import { TruckFilled } from '@ant-design/icons';

const style = {
  position: 'absolute',
  top: '55%',
  left: '75%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal(props) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(props)

  return (
    <div className="relative">
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {open && <div className="fixed inset-y-0 right-0 w-1/2 backdrop-blur-[1px] z-10 pointer-events-none" />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: 'transparent',
          },
        }}
      >
        {/* <Box sx={{ ...style, width: 400 }}> */}
        <Box sx={{ ...style, width: 400 }} className="flex flex-col justify-center text-center bg-white border pt-10 border-gray-300 rounded-lg px-12 pb-8 font-sans" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)' }}>
          {/* <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p> */}
          <OTP/>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
