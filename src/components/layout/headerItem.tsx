import react from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProgressBar from '../task/progresBarItem'; // asegúrate que el path es correcto

function Header() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth:2, borderColor: 'red', padding: 10, backgroundColor: '#f8f9fa' }}>
      {/* Logo con acción */}
      <View className="flex-row items-center justify-between" style={{ width: '10%', marginRight: 20 }}>
        <TouchableOpacity onPress={() => console.log("Logo presionado")} className="py-1" style={{ padding: 10 ,width: '100%', height: '100%', alignItems: 'center', borderRadius: 5 }}>
          <Text className="text-xl font-bold">4'🕓</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de progreso (sin props) */}
      <View className="my-2" style={{ width: '55%', marginRight: 20 }}>
        <ProgressBar total={0} completed={0} />
      </View>

      {/* Botones de ordenamiento */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '31%', marginLeft:-8, padding: 10 }}  className="flex-row items-center justify-between">
        <TouchableOpacity style={{ borderWidth: 2, borderColor: 'blue', padding: 10, borderRadius: 5 }}>
          <Text className="text-l text-gray-700">Por Fecha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderWidth: 2, borderColor: 'red', padding: 8, borderRadius: 5, marginLeft: 10 }}>
          <Text className="text-l text-gray-700">Por Enfoque</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



export default Header;