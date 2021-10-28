import React, { useMemo } from 'react'
import Select from 'react-select';
import { Spinner } from 'reactstrap';
import useSWR from 'swr';
import { useFilterProfessionalContext } from '../ProfessionalContext';

function ProjectsFilter() {
    const [filter, setFilter] = useFilterProfessionalContext()

    const { data: getProject, error: errorProject } = useSWR(() => `v1/project/client`, { refreshInterval: 0 });
    const loading = !getProject || errorProject;
    const project = useMemo(() => {
        return getProject?.data?.data.map(p => ({ label: p.name, value: p.id })) ?? [];
    }, [getProject]);

    const handleChangeProject = (e) => {
        setFilter(state => ({ ...state, project: e ?? '' }))
    }

    if (loading) {
        return (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: "rgba(255,255,255, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spinner style={{ width: 48, height: 48 }} />
            </div>
        )
    }

    return (
        <>
            <div className="font-weight-bold mb-2 text-center">Based on project</div>
            <div className="px-3">
                <Select
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