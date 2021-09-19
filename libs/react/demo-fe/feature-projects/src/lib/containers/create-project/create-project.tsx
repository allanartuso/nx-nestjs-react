import { ProjectDto } from '@dm/shared/demo/data-model';
import { useDispatch } from 'react-redux';
import { formActions } from '../../+state/project.actions';
import { ProjectForm } from '../../components/project-form/project-form';
import './create-project.module.scss';

export function CreateProject() {
  const dispatch = useDispatch();

  const onSubmit = (resource: ProjectDto) => {
    dispatch(formActions.create(resource));
  };

  return (
    <div>
      <ProjectForm submit={onSubmit}></ProjectForm>
    </div>
  );
}

export default CreateProject;
