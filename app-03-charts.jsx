// ============================================================================
// PE PREP — CHARTS: lightweight inline-SVG charts, theme-aware via CSS vars
// ============================================================================

function BarChart({data, height=220, valueSuffix="%", colorFn}){
  // data: [{label, value}]
  const max = Math.max(100, ...data.map(d=>d.value));
  const padL = 34, padB = 34, padT = 26, padR = 10;
  const w = Math.max(360, data.length*70);
  const plotH = height - padT - padB;
  const plotW = w - padL - padR;
  const barW = Math.min(46, plotW/data.length - 16);
  const ticks = [0,25,50,75,100];
  return React.createElement("div",{className:"overflow-x"},
    React.createElement("svg",{viewBox:`0 0 ${w} ${height}`, width:"100%", style:{minWidth:w, height}},
      ticks.map(t=>{
        const y = padT + plotH - (t/max>1?1:t/max)*plotH;
        return React.createElement("g",{key:t},
          React.createElement("line",{x1:padL, x2:w-padR, y1:y, y2:y, className:"chart-grid"}),
          React.createElement("text",{x:padL-8, y:y+4, textAnchor:"end", className:"chart-label"}, t)
        );
      }),
      data.map((d,i)=>{
        const x = padL + i*(plotW/data.length) + (plotW/data.length - barW)/2;
        const barH = (Math.min(d.value,max)/max)*plotH;
        const y = padT + plotH - barH;
        const color = colorFn ? colorFn(d) : (d.value>=75?"var(--success)":d.value>=55?"var(--warning)":"var(--danger)");
        return React.createElement("g",{key:i},
          React.createElement("rect",{x, y, width:barW, height:barH, rx:6, style:{fill:color}}),
          React.createElement("text",{x:x+barW/2, y:y-8, textAnchor:"middle", className:"chart-value"}, d.value+valueSuffix),
          React.createElement("text",{x:x+barW/2, y:height-12, textAnchor:"middle", className:"chart-label"}, d.label.length>10? d.label.slice(0,9)+"…":d.label)
        );
      })
    )
  );
}

function LineChart({points, height=180, color="var(--info)", valueSuffix=""}){
  // points: [{label,value}]
  const max = Math.max(...points.map(p=>p.value), 10);
  const min = Math.min(...points.map(p=>p.value), 0);
  const padL=30,padR=14,padT=16,padB=28;
  const w = Math.max(360, points.length*60);
  const plotW = w-padL-padR, plotH = height-padT-padB;
  const xy = points.map((p,i)=>({
    x: padL + (points.length===1?0:i*(plotW/(points.length-1))),
    y: padT + plotH - ((p.value-min)/(max-min||1))*plotH,
    ...p
  }));
  const path = xy.map((p,i)=>(i===0?"M":"L")+p.x.toFixed(1)+","+p.y.toFixed(1)).join(" ");
  const area = path + ` L${xy[xy.length-1].x},${padT+plotH} L${xy[0].x},${padT+plotH} Z`;
  return React.createElement("div",{className:"overflow-x"},
    React.createElement("svg",{viewBox:`0 0 ${w} ${height}`, width:"100%", style:{minWidth:w, height}},
      React.createElement("defs",null,
        React.createElement("linearGradient",{id:"lcGrad", x1:"0",y1:"0",x2:"0",y2:"1"},
          React.createElement("stop",{offset:"0%", style:{stopColor:color, stopOpacity:.28}}),
          React.createElement("stop",{offset:"100%", style:{stopColor:color, stopOpacity:0}})
        )
      ),
      React.createElement("line",{x1:padL,x2:w-padR,y1:padT+plotH,y2:padT+plotH, className:"chart-grid"}),
      React.createElement("path",{d:area, style:{fill:"url(#lcGrad)"}}),
      React.createElement("path",{d:path, style:{fill:"none",stroke:color,strokeWidth:2.5,strokeLinejoin:"round",strokeLinecap:"round"}}),
      xy.map((p,i)=>React.createElement("g",{key:i},
        React.createElement("circle",{cx:p.x, cy:p.y, r:i===xy.length-1?4.5:3, style:{fill:color}}),
        React.createElement("text",{x:p.x, y:height-8, textAnchor:"middle", className:"chart-label"}, p.label)
      ))
    )
  );
}

function DonutChart({value, size=140, color="var(--accent)", label, sub}){
  const r = size/2-14, c = 2*Math.PI*r, off = c*(1-value/100);
  return React.createElement("div",{style:{position:"relative", width:size, height:size}},
    React.createElement("svg",{width:size, height:size, viewBox:`0 0 ${size} ${size}`},
      React.createElement("circle",{cx:size/2, cy:size/2, r, style:{fill:"none",stroke:"var(--surface-3)",strokeWidth:14}}),
      React.createElement("circle",{cx:size/2, cy:size/2, r, style:{fill:"none",stroke:color,strokeWidth:14,strokeLinecap:"round",
        strokeDasharray:c, strokeDashoffset:off, transform:`rotate(-90deg)`, transformOrigin:"center", transition:"stroke-dashoffset .6s ease"}})
    ),
    React.createElement("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},
      React.createElement("div",{className:"num", style:{fontSize:size*.19, fontWeight:700}}, (label!==undefined?label:value+"%")),
      sub && React.createElement("div",{className:"tiny muted"}, sub)
    )
  );
}

function HBarRow({label, value, max=100, color}){
  const c = color || (value>=75?"var(--success)":value>=55?"var(--warning)":"var(--danger)");
  return React.createElement("div",{style:{marginBottom:14}},
    React.createElement("div",{className:"flex justify-between small", style:{marginBottom:5}},
      React.createElement("span",null,label), React.createElement("span",{className:"num", style:{fontWeight:600}}, value+"%")
    ),
    React.createElement("div",{className:"progress-track"}, React.createElement("div",{className:"progress-fill", style:{width:clamp(value,0,max)+"%", background:c}}))
  );
}
