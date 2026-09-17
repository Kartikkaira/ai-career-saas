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
    { key: 'keywordMatch', label: 'Keyword Match', score: breakdown.keywordMatch || 70 },
    { key: 'quantifiedImpact', label: 'Quantified Impact', score: breakdown.quantifiedImpact || 70 },
    { key: 'actionVerbs', label: 'Action Verbs', score: breakdown.actionVerbs || 70 },
    { key: 'formatting', label: 'Formatting & Layout', score: breakdown.formatting || 70 },
    { key: 'lengthAndStructure', label: 'Length & Hierarchy', score: breakdown.lengthAndStructure || 70 },
    { key: 'contactCompleteness', label: 'Contact Info', score: breakdown.contactCompleteness || 70 },
  ];

  const chartData = dimensions.map((d) => ({
    subject: d.label,
    Score: d.score,
    fullMark: 100,
  }));

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-[#4f46e5]';
    if (score >= 60) return 'bg-indigo-400';
    if (score >= 45) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(79,70,229,0.06)] space-y-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Section-by-Section ATS Breakdown
        </h4>
        <span className="text-xs text-slate-400">6 Dimension Analysis</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Chart (5 cols) */}
        <div className="lg:col-span-5 h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '12px',
                  color: '#0f172a',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Radar
                name="ATS Score"
                dataKey="Score"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.25}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dimension Progress Bars (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          {dimensions.map((dim) => (
            <div key={dim.key} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700">{dim.label}</span>
                <span className="text-slate-900 font-mono">{dim.score} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${getScoreColor(dim.score)}`}
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
