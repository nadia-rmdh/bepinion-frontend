import React, { useMemo } from 'react'
import Select from 'react-select';
import useSWR from 'swr';
import { useFilterProfessionalContext } from '../ProfessionalContext';

function ProjectsFilter() {
    const [filter, setFilter] = useFilterProfessionalContext()

    const { data: getProject, error: errorProject, mutate: mutateProject } = useSWR(() => `v1/project/client`, { refreshInterval: 0 });
    const loading = !getProject || errorProject;
    const project = useMemo(() => {
        return getProject?.data?.data.map(p => ({ label: p.name, value: p.id })) ?? [];
    }, [getProject]);

    const handleChangeProject = (e) => {
        setFilter(state => ({ ...state, project: e ?? '' }))
    }

    return (
        <>
            <div className="font-weight-bold mb-2 text-center">Based on project</div>
            <div className="px-3">
                <Select
                    closeMenuOnSelect={false}
                    options={project}
                    isClearable
                    placeholder="Choose a Project..."
                    onChange={(e) => handleChangeProject(e)}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    value={filter.project} />
            </div>
        </>
    )
}

export default ProjectsFilter