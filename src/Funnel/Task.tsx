import React, { useContext } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { FunnelContext } from '../reducer';
import { Card, Typography, Avatar, makeStyles, Theme } from '@material-ui/core';

type OwnProps = {
    task: Funnel.Task;
    index: number;
}

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1),
        margin: theme.spacing(1, 1),
        maxWidth: theme.spacing(34),
        minWidth: theme.spacing(34),
        width: theme.spacing(34),
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        textAlign: 'start',
        maxLines: 2,
        marginTop: theme.spacing(1),
    },
    descriptor: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(1),
    },
    priority: {
        marginLeft: theme.spacing(2),
    }, 
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: theme.spacing(1),
        alignItems: 'center',
    },
    priorityIndecatorUrgent: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: theme.palette.error.main,
    },
    priorityIndecatorHigh: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: theme.palette.primary.main,
    },
    priorityIndecatorNormal: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: theme.palette.success.main,
    }
}));

const Task: React.FC<OwnProps> = ({ task, index}) => {
    const { dispatchFunnelReducer, funnelStore } = useContext(FunnelContext);
    const classes = useStyle();
    
    const getCategoryValue = (id: string) => {
        return funnelStore.categories?.filter(catergory => catergory.id === id)[0].value;
    }

    const getPriorityValue = (id: string) => {
        return funnelStore.priorities?.filter(priority => priority.id === id)[0].value;
    }
    
    return <Draggable key={task.id} draggableId={task.id} index={index}> 
       {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
            <Card className={classes.root} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                <div className={classes.top}>
                    <Images images = {task.photos} />
                    {task.priority === 'urgent' ?  <div className={classes.priorityIndecatorUrgent}></div> : 
                        task.priority === 'high' ?  <div className={classes.priorityIndecatorHigh}></div>: 
                        task.priority === 'normal' ?  <div className={classes.priorityIndecatorNormal}></div>: null}
                </div>
                <Typography variant="body2" color="textPrimary" className={classes.title} noWrap>{task.name}</Typography>
                <Typography variant="caption" color="textSecondary">{getCategoryValue(task.category)}</Typography>
                <div className={classes.descriptor}>
                    <div>
                        <Typography variant="caption" color="textSecondary">Task Value</Typography>
                        <Typography variant="body2" color="textPrimary">{task.amount}</Typography>
                    </div>

                    <div className={classes.priority}>
                        <Typography variant="caption" color="textSecondary">Priority</Typography>
                        <Typography variant="body2" color="textPrimary">{getPriorityValue(task.priority)}</Typography>
                    </div>
                </div>
            </Card>
       )}
    </Draggable>
    
}

export default Task;

type ImageProps = {
    images: string[];
}

const imageStyle = makeStyles((theme: Theme) => ({
    root: {

    },
    images: {
        marginLeft: theme.spacing(-1.5),
        width: theme.spacing(3),
        height: theme.spacing(3),
        border: `2px solid ${theme.palette.grey[200]}`
    },
    image: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        borderRadius: 8,
    },
    imageHolder: {
        display: 'flex',
    },
    imagesHolder: {
        display: 'flex',
        flexDirection: 'row',
        margin: theme.spacing(1, 0, 1, 1),
    }
}))

const Images: React.FC<ImageProps> = ({images}) => {
    const classes = imageStyle();

    if(images.length === 1) return <div className={classes.imageHolder}>
        <img className={classes.image} src={images[0]} alt="iamge for task 0" />
    </div>

    return <div className={classes.imagesHolder}>
        {images.map(image => <Avatar key={image} src={image} className={classes.images} sizes="small" />)}
    </div>
}