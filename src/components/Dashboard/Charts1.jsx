import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';

const data = [
  { name: 'Jan', uv: 590, pv: 800, amt: 1400, cnt: 490 },
  { name: 'Fév', uv: 868, pv: 967, amt: 1506, cnt: 590 },
  { name: 'Mar', uv: 1397, pv: 1098, amt: 989, cnt: 350 },
  { name: 'Avr', uv: 1480, pv: 1200, amt: 1228, cnt: 480 },
  { name: 'Mai', uv: 1520, pv: 1108, amt: 1100, cnt: 460 },
  { name: 'Juin', uv: 1400, pv: 680, amt: 1700, cnt: 380 },
];

// 🎨 Palette de couleurs personnalisée
const COLORS = {
  area: '#FF8C00',      // Orange foncé
  areaFill: '#FF8C0020', // Orange transparent
  bar: '#FFA832',       // Orange principal (comme votre thème)
  line: '#1a1a2e',      // Bleu foncé élégant
  scatter: '#e94560',   // Rouge/rose
  grid: '#f0f0f0',
  tooltipBg: '#1a1a2e',
};

const Charts1 = () => {
  return (
    <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px]">
      <ComposedChart
        width={700}
        height={350}
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
      >
        {/* Grille */}
        <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
        
        {/* Axes */}
        <XAxis dataKey="name" scale="band" tick={{ fill: '#666', fontSize: 11 }} />
        <YAxis 
          width={40} 
          tick={{ fill: '#666', fontSize: 11 }}
          tickFormatter={(value) => `$${value}`}
        />
        
        {/* Tooltip personnalisé */}
        <Tooltip 
          contentStyle={{ 
            backgroundColor: COLORS.tooltipBg, 
            border: 'none', 
            borderRadius: '8px',
            color: '#fff',
            fontSize: '12px'
          }}
          itemStyle={{ color: '#fff' }}
          labelStyle={{ color: '#fff', fontWeight: 'bold' }}
        />
        
        {/* Légende */}
        <Legend 
          wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
          iconType="circle"
        />

        {/* Area (AMT) - Orange */}
        <Area 
          type="monotone" 
          dataKey="amt" 
          fill={COLORS.areaFill} 
          stroke={COLORS.area} 
          strokeWidth={2}
          name="Revenue"
        />
        
        {/* Bar (PV) - Orange clair */}
        <Bar 
          dataKey="pv" 
          barSize={20} 
          fill={COLORS.bar} 
          name="Sales"
          radius={[4, 4, 0, 0]}
        />
        
        {/* Line (UV) - Bleu foncé */}
        <Line 
          type="monotone" 
          dataKey="uv" 
          stroke={COLORS.line} 
          strokeWidth={2.5}
          dot={{ fill: COLORS.line, r: 4 }}
          activeDot={{ r: 6 }}
          name="Users"
        />
        
        {/* Scatter (CNT) - Rouge */}
        <Scatter 
          dataKey="cnt" 
          fill={COLORS.scatter} 
          name="Orders"
          shape="circle"
        />
      </ComposedChart>
    </div>
  );
};

export default Charts1;




// import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';

// const data = [
//   { name: 'Page A', uv: 590, pv: 800, amt: 1400, cnt: 490 },
//   { name: 'Page B', uv: 868, pv: 967, amt: 1506, cnt: 590 },
//   { name: 'Page C', uv: 1397, pv: 1098, amt: 989, cnt: 350 },
//   { name: 'Page D', uv: 1480, pv: 1200, amt: 1228, cnt: 480 },
//   { name: 'Page E', uv: 1520, pv: 1108, amt: 1100, cnt: 460 },
//   { name: 'Page F', uv: 1400, pv: 680, amt: 1700, cnt: 380 },
// ];

// const Charts1 = () => {
//   return (
//     <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px]">
//       <ComposedChart
//         width={700}
//         height={350}
//         data={data}
//         margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
//       >
//         <CartesianGrid stroke="#f5f5f5" />
//         <XAxis dataKey="name" scale="band" />
//         <YAxis width={40} />
//         <Tooltip />
//         <Legend />
//         <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
//         <Bar dataKey="pv" barSize={20} fill="#413ea0" />
//         <Line type="monotone" dataKey="uv" stroke="#ff7300" />
//         <Scatter dataKey="cnt" fill="red" />
//       </ComposedChart>
//     </div>
//   );
// };

// export default Charts1;