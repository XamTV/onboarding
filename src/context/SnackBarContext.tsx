import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface SnackbarAction {
  label: string;
  onPress: () => void;
}

interface SnackbarData {
  text: string;
  action?: SnackbarAction;

  onIconPress?: () => void;
  duration?: number;
}

type EnqueueSnackbar = (message: SnackbarData | string) => void;

export interface SnackbarController extends SnackbarData {
  onDismiss: () => void;
  visible: boolean;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

interface SnackbarContextData {
  queue: SnackbarData[];
  enqueue: EnqueueSnackbar;
  dequeue: () => void;
  clearQueue: () => void;
  visible: boolean;
  controller: SnackbarController;
}

const SNACKBAR_FADE_TRANSITION_DURATION = 200;

const SnackbarContext = createContext({} as SnackbarContextData);

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [queue, setQueue] = useState<SnackbarData[]>([]);
  const [visible, setVisible] = useState(false);

  const dequeueTimer = useRef<NodeJS.Timeout>();

  const dequeue = () => {
    setVisible(false);
  };

  const enqueue: EnqueueSnackbar = (message) => {
    const isMessageString = typeof message === "string";

    const newSnackbar: SnackbarData = isMessageString
      ? {
          text: message,
          onIconPress: dequeue,
        }
      : message;

    setQueue((prevSnackbars) => [...prevSnackbars, newSnackbar]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  useEffect(() => {
    if (!visible) {
      dequeueTimer.current = setTimeout(() => {
        setQueue((prevSnackbars) => prevSnackbars.slice(1));
      }, SNACKBAR_FADE_TRANSITION_DURATION);

      return () => {
        clearTimeout(dequeueTimer.current);
      };
    }
  }, [visible]);

  useEffect(() => {
    if (queue.length > 0) {
      setVisible(true);
    }
  }, [queue]);

  const contextValue = React.useMemo(
    () => ({
      queue,
      visible,
      enqueue,
      dequeue,
      clearQueue,
      controller: {
        ...queue[0],
        onDismiss: dequeue,
        visible,
      },
    }),
    [queue, visible, enqueue, dequeue, clearQueue]
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
