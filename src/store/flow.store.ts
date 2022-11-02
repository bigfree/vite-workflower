import produce, {enableMapSet} from "immer";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnConnect,
    OnEdgesChange,
    OnNodesChange
} from "reactflow";
import create from "zustand";
import {persist} from "zustand/middleware";
import {persistConfig} from "../configs/persist.config";

enableMapSet();

export type NodeData = {
    label: string;
    nodeDataProp?: string;
}

export type EdgeData = {
    edgeDataProp?: string;
}

export type NodeEntity = Node<NodeData>;
export type EdgeEntity = Edge<EdgeData>;

export type FlowStoreState = {
    nodes: Map<string, NodeEntity>;
    edges: Map<string, EdgeEntity>;
    addSingleNode: (node: NodeEntity) => void;
    addSingleEdge: (edge: EdgeEntity) => void;
    addManyNodes: (nodes: NodeEntity[]) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    getAllNodes: () => NodeEntity[];
    getAllEdges: () => EdgeEntity[];
    _hasHydrated: boolean,
    setHasHydrated: (state: boolean) => void;
}

const useFlowStore = create<FlowStoreState>()(persist((set, get) => ({
    nodes: new Map([]),
    edges: new Map([]),
    addSingleNode: (node: NodeEntity) => {
        set(produce((draft: FlowStoreState) => {
            draft.nodes.set(node.id, node);
        }));
    },
    addSingleEdge: (edge: EdgeEntity) => {
        set(produce((draft: FlowStoreState) => {
            draft.edges.set(edge.id, edge);
        }));
    },
    addManyNodes: (nodes: NodeEntity[]) => {
        set(produce((draft: FlowStoreState) => {
            nodes.forEach((node: NodeEntity) => draft.nodes.set(node.id, node));
        }));
    },
    onNodesChange: (changes: NodeChange[]) => {
        set(produce((draft: FlowStoreState) => {
            const nodes: NodeEntity[] = applyNodeChanges(changes, get().getAllNodes());
            nodes.forEach((node: NodeEntity) => draft.nodes.set(node.id, node));
        }));
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set(produce((draft: FlowStoreState) => {
            const edges: EdgeEntity[] = applyEdgeChanges(changes, get().getAllEdges());
            edges.forEach((edge: EdgeEntity) => draft.edges.set(edge.id, edge));
        }));
    },
    onConnect: (connection: Connection) => {
        set(produce((draft: FlowStoreState) => {
            console.log(connection)
            const edges: EdgeEntity[] = addEdge(connection, get().getAllEdges());
            edges.forEach((edge: EdgeEntity) => draft.edges.set(edge.id, edge));
        }));
    },
    getAllNodes: () => {
        return Array.from(get().nodes.values()) as NodeEntity[];
    },
    getAllEdges: () => {
        return Array.from(get().edges.values()) as EdgeEntity[];
    },
    _hasHydrated: false,
    setHasHydrated: (state: boolean) => {
        set(produce((draft: FlowStoreState) => {
            draft._hasHydrated = state;
        }));
    }
}), persistConfig));

export default useFlowStore;