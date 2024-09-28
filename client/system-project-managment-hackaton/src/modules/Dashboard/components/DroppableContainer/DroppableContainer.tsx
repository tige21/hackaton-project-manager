import {UniqueIdentifier} from "@dnd-kit/core";
import React from "react";
import {AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Container} from "../Container/Container.tsx";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({...args, wasDragging: true});

export interface ContainerProps {
    children: React.ReactNode;
    columns?: number;
    label?: string;
    style?: React.CSSProperties;
    horizontal?: boolean;
    hover?: boolean;
    scrollable?: boolean;
    shadow?: boolean;
    placeholder?: boolean;
    unstyled?: boolean;

    onClick?(): void;
}

export function DroppableContainer({
                                children,
                                columns = 1,
                                disabled,
                                id,
                                items,
                                style,
                                ...props
                            }: ContainerProps & {
    disabled?: boolean;
    id: UniqueIdentifier;
    // items: Card[];
    items: any;
    style?: React.CSSProperties;
}) {
    const {
        active,
        isDragging,
        over,
        setNodeRef,
        transition,
        transform,
    } = useSortable({
        id,
        data: {
            type: 'container',
            children: items,
        },
        animateLayoutChanges,
    });
    const isOverContainer = over
        ? (id === over.id && active?.data.current?.type !== 'container') ||
        !!items.find((task) => task.id == over.id)
        : false;

    return (
        <Container
            ref={disabled ? undefined : setNodeRef}
            style={{
                ...style,
                transition,
                transform: CSS.Translate.toString(transform),
                opacity: isDragging ? 0.5 : undefined,
            }}
            hover={isOverContainer}
            columns={columns}
            {...props}
        >
            {children}
        </Container>
    );
}