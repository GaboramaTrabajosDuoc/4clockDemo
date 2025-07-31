import { SafeAreaView, View, Text, Platform } from 'react-native';
import TaskScreen from '../src/screens/TaskScreen';
import Header from '../src/components/layout/headerItem';
import Footer from '../src/components/layout/footerItem';

const Wrapper = Platform.OS === 'web' ? View:SafeAreaView;

export default function Home() {
  return (   
      <Wrapper style={{ flex:1 }}>  
        <TaskScreen />
      </Wrapper>
  );
}

