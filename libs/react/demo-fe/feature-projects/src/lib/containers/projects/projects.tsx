import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './projects.module.scss';

export function Projects() {
  return (
    <div>
      <div>
        <Button>
          <Link to="/projects/create">Add project</Link>
        </Button>
      </div>
      Projects
    </div>
  );
}

export default Projects;
