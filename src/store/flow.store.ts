import produce, {enableMapSet} from "immer";
import {applyNodeChanges, Edge, Node, NodeChange, OnNodesChange} from "reactflow";
import create from "zustand";

enableMapSet();

type NodeData = {
    label: string;
    nodeDataProp?: string;
}

type EdgeData = {
    edgeDataProp?: string;
}

type NodeEntity = Node<NodeData>;
type EdgeEntity = Edge<EdgeData>;

type FlowStoreState = {
    nodes: Map<string, NodeEntity>;
    edges: Map<string, EdgeEntity>;
    onNodesAddChange: (node: NodeEntity[]) => void;
    addSingleNode: (node: NodeEntity) => void;
    addSingleEdge: (edge: EdgeEntity) => void;
    getAllNode: () => NodeEntity[];
    getAllEdge: () => EdgeEntity[];
    // onNodesChange: OnNodesChange;
    // onEdgesChange: OnEdgesChange;
    // onConnect: OnConnect;
}

const useFlowStore = create<FlowStoreState>((set, get) => ({
    nodes: new Map([]),
    edges: new Map([]),
    addSingleNode: (node: NodeEntity) => {
        set(produce((draft: FlowStoreState) => {
            draft.nodes.set(node.id, node);
        }))
    },
    onNodesAddChange: (nodes: NodeEntity[]) => {
        console.log(nodes);
        nodes.map((node: NodeEntity) => ({
            [node.id]: node
        }));
        console.log(nodes);
        // // @ts-ignore
        // const obj = Object.assign({}, ...Object.keys(nodes).map((key) => ({[nodes[key].id]: nodes[key]})));
        // // nodes.map((node: NodeEntity) => Object.create(node.id, node);
        // set(produce((draft: FlowStoreState) => {
        //     draft.nodes = new Map(Object.entries(obj));
        // }))
    },
    addSingleEdge: (edge: EdgeEntity) => {
        set(produce((draft: FlowStoreState) => {
            draft.edges.set(edge.id, edge);
        }))
        // set((state: FlowStoreState) => ({
        //     ...state,
        //     edges: new Map(state.edges).set(edge.id, edge),
        // }))
    },
    getAllNode: () => {
        return Array.from(get().nodes.values()) as NodeEntity[];
    },
    getAllEdge: () => {
        return Array.from(get().edges.values()) as EdgeEntity[];
    },
    // onNodesChange: (changes: NodeChange[]) => {
    //     set(produce((draft: FlowStoreState) => {
    //         console.log(applyNodeChanges(changes, get().getAllNode()));
    //         draft.nodes = new Map([]);
    //     }));
    //     // set((state: NodeState) => ({
    //     //     ...state,
    //     //     nodes: applyNodeChanges(changes, get().nodes),
    //     // }))
    // },
    // onEdgesChange: (changes: EdgeChange[]) => {
    //     set((state: NodeState) => ({
    //         ...state,
    //         edges: applyEdgeChanges(changes, get().edges),
    //     }))
    // },
    // onConnect: (connection: Connection) => {
    //     set((state: NodeState) => ({
    //         ...state,
    //         edges: addEdge(connection, get().edges),
    //     }));
    // },
}));

export default useFlowStore;