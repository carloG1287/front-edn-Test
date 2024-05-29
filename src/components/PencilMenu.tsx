import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, styled, Modal, Fade, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ProjectRollbackButton from './ProjectRollbackButton';
import TaskForm from './TaskForm';
import axios from 'axios';
import BACKEND_URL from '../config';

interface PencilMenuProps {
  projectId: number;
  onRollbackSuccess: () => void;
}

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'visible',
    '& .MuiList-root': {
      padding: 0,
    },
  },
}));

const StyledMenuItem = styled(MenuItem)({
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const PencilMenu: React.FC<PencilMenuProps> = ({ projectId, onRollbackSuccess }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openTaskForm, setOpenTaskForm] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTaskFormOpen = () => {
    setOpenTaskForm(true);
    handleClose();
  };

  const handleTaskFormClose = () => {
    setOpenTaskForm(false);
  };

  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/projects/${projectId}`);
        setProjectName(response.data.name);
      } catch (error) {
        console.error('Error fetching project name:', error);
      }
    };

    fetchProjectName();
  }, [projectId]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <IconButton onClick={handleClick} size="large">
          <EditIcon />
        </IconButton>
        <StyledMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <StyledMenuItem onClick={handleTaskFormOpen}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              fullWidth
              onClick={handleTaskFormOpen}
            >
              Create Task
            </Button>
          </StyledMenuItem>
          <StyledMenuItem onClick={handleClose}>
            <ProjectRollbackButton projectId={projectId} onRollbackSuccess={onRollbackSuccess} />
          </StyledMenuItem>
        </StyledMenu>
      </div>
      <Modal
        open={openTaskForm}
        onClose={handleTaskFormClose}
        closeAfterTransition
      >
        <Fade in={openTaskForm}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: '400px',
              maxWidth: '90%',
            }}
          >
            <TaskForm onClose={handleTaskFormClose} projectId={projectId} projectName={projectName} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PencilMenu;