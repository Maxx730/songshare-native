import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SsInput from './src/components/SsInput';
import SsButton from './src/components/SsButton';
import SsButtonSet from './src/components/SsButtonSet';
import SsCard from './src/components/SsCard';
import SsCollapse from './src/components/SsCollapse';

export default function App() {
  return (
    <View style={{
      marginTop: 100,
      padding: 24
    }}>
      <SsInput icon={'user'} placeholder={'Default'}/>
      <SsInput icon={'lock1'} disabled placeholder={'Disabled'}/>
      <SsInput dashed placeholder={'Dashed'}/>

      <SsCollapse>
        <SsButton label={'Default'} />
        <SsButton icon={'star'} primary/>
        <SsButton label={'Danger'} danger/>
        <SsButton label={'Dashed'} dashed/>
        <SsButton label={'Link'} link/>
      </SsCollapse>

      <SsCard round actions={[
        {
          label: 'Action 1'
        },{
          label: 'Action 2'
        },{
          label: 'Action 3'
        }
      ]} title={'Default Card'}>
        <SsButtonSet>
          <SsButton icon={'tag'}/>
          <SsButton label={'Center'}/>
          <SsButton label={'Right'}/>
        </SsButtonSet>
      </SsCard>
    </View>
  );
}
