import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export const ScoreRadar = ({ breakdown = {} }) => {
  const dimensions = [
    { key: 'keywordMatch', label: 'Keyword match', score: breakdown.keywordMatch || 75 },
    { key: 'quantifiedImpact', label: 'Quantified impact', score: breakdown.quantifiedImpact || 72 },
    { key: 'actionVerbs', label: 'Action verbs', score: breakdown.actionVerbs || 80 },
    { key: 'formatting', label: 'Formatting & layout', score: breakdown.formatting || 85 },
    { key: 'lengthAndStructure', label: 'Length & hierarchy', score: breakdown.lengthAndStructure || 78 },
    { key: 'contactCompleteness', label: 'Contact details', score: breakdown.contactCompleteness || 90 },
  ];

  const chartData = dimensions.map((d) => ({
    subject: d.label,
    Score: d.score,
    fullMark: 100,
  }));

  return (
    <div className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#15130F]/10 shadow-xs space-y-6 text-[#15130F]">
      <div className="flex justify-between items-center border-b border-[#15130F]/10 pb-3">
        <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#15130F]">
          Section breakdown
        </h4>
        <span className="text-xs text-[#5C564E]">6 Dimension scan</span>
      </div>

      <div className="space-y-4">
        {/* Radar Chart */}
        <div className="h-56 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="rgba(21, 19, 15, 0.12)" />
              <PolarAngleAxis
                dataKey="subject"
                stroke="#5C564E"
                tick={{ fill: '#5C564E', fontSize: 10, fontFamily: 'Plus Jakarta Sans' }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(21, 19, 15, 0.15)" tick={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FAF8F3',
                  borderColor: 'rgba(21, 19, 15, 0.15)',
                  borderRadius: '16px',
                  color: '#15130F',
                  fontSize: '12px',
                  boxShadow: 'none',
                }}
              />
              <Radar
                name="Score"
                dataKey="Score"
                stroke="#B8571E"
                fill="#B8571E"
                fillOpacity={0.25}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dimension Sliders */}
        <div className="space-y-2.5 pt-2 border-t border-[#15130F]/10">
          {dimensions.map((dim) => (
            <div key={dim.key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#15130F]">{dim.label}</span>
                <span className="font-mono text-[#5C564E]">{dim.score}%</span>
              </div>
              <div className="w-full bg-[#E8E3D7] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#15130F] h-1.5 rounded-full"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
