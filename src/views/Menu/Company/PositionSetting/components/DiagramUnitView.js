import React, { useState, useEffect } from 'react'
import { Tree, treeUtil } from 'react-d3-tree'
import { Button } from 'reactstrap';

const TOP_LEVEL_NODE_NAME = 'Struktur'

const TreeNodeComponent = ({ nodeData }) => {
    return (
    <div style={{
        border: 'solid 1px #000',
        width: '100%',
        background: nodeData.name === TOP_LEVEL_NODE_NAME ? '#335877' : '#ffffff',
        color: nodeData.name === TOP_LEVEL_NODE_NAME ? '#ffffff' : '#000000',
        borderRadius: 5,
        textAlign: 'center',
        padding: 5,
    }}>
        <strong>{ nodeData.name }</strong>
    </div>)
}

export default function DiagramUnitView(props) {
    const data = treeUtil.generateHierarchy(props.data.map(item => ({
        child: item.name,
        parent: item.parent?.name || TOP_LEVEL_NODE_NAME
    })));

    const [orientation, setOrientation] = useState('vertical')
    const [translate, setTranslate] = useState({x: 0, y: 50})
    const [treeContainer, setTreeContainer] = useState('')
    
    const toggleOrientation = () => {
        setOrientation(orientation === 'vertical' ? 'horizontal' : 'vertical')
    }

    useEffect(() => {
        if (treeContainer) {
            const dimension = treeContainer.getBoundingClientRect()
            setTranslate(orientation === 'vertical' ? {x: dimension.width / 2, y: 50} : {x: 0, y: dimension.height / 2})
        }
    }, [treeContainer, orientation])

    return <div>
        <Button color="netis-color" onClick={toggleOrientation}>
            {orientation === 'vertical' ? <i className="fa fa-sitemap"></i> : <i style={{ transform: 'rotate(-90deg)'}} className="fa fa-sitemap"></i>}
        </Button>
        <div style={{ width: '100%', height: 600 }} ref={tc => setTreeContainer(tc)}>
            <Tree
                data={data}
                orientation={orientation}
                translate={translate}
                pathFunc={'step'}
                nodeSvgShape={{
                    shape: 'rect',
                    shapeProps: {
                        width: 0,
                        height: 0
                    }
                }}
                zoom={0.8}
                collapsible={false}
                shouldCollapseNeighborNodes={false}
                transitionDuration={0}
                nodeSize={{
                    x: 250,
                    y: 80
                }}
                depthFactor={orientation === 'vertical' ? 80 : 250}
                allowForeignObjects
                nodeLabelComponent={{
                    render: <TreeNodeComponent />,
                    foreignObjectWrapper: {
                        width: 200,
                        height: 70,
                        y: -15,
                        x: orientation === 'vertical' ? -100 : 0
                    }
                }}
            />
        </div>
    </div>
}
