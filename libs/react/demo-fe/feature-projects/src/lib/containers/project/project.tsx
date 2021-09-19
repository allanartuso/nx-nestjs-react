import { ProjectDto } from '@dm/shared/demo/data-model';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { formActions } from '../../+state/project.actions';
import { formSelectors } from '../../+state/project.selectors';
import { ProjectForm } from '../../components/project-form/project-form';
import './project.module.scss';

export function Project() {
  const dispatch = useDispatch();
  const project = useSelector(formSelectors.getResource);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(formActions.load(+id));
  }, [dispatch, id]);

  const onSubmit = (resource: ProjectDto) => {
    dispatch(formActions.save(resource));
  };

  return <div>{project ? <ProjectForm resource={project} submit={onSubmit}></ProjectForm> : <div>wait Project</div>}</div>;
}

export default Project;
