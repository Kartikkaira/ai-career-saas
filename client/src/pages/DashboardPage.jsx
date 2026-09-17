import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../services/userApi';
import { useAuthStore } from '../store/authStore';
import { useResumeStore } from '../store/resumeStore';
import { useAnalysisStore } from '../store/analysisStore';
import { useUiStore } from '../store/uiStore';
import { Badge } from '../components/common/Badge';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import {
  FileText,
  ScanSearch,
  TrendingUp,
  Crown,
  Plus,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  AlertCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuthStore();
  const { fetchResumes, resumes, deleteResume, duplicateResume } = useResumeStore();
  const { fetchHistory, analysisHistory, deleteAnalysis } = useAnalysisStore();
  const { openUpgradeModal, addToast } = useUiStore();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const data = await userApi.getDashboardStats();
      if (data.stats) {
        setStats(data.stats);
      }
      await fetchResumes();
      await fetchHistory();
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditResume = (resumeId) => {
    navigate(`/builder?id=${resumeId}`);
  };

  const handleDuplicate = async (resumeId) => {
    const res = await duplicateResume(resumeId);
    if (res.success) {
      addToast('Resume duplicated!', 'success');
      loadDashboardData();
    } else if (res.isUpgradeRequired) {
      openUpgradeModal();
    } else {
      addToast(res.message || 'Duplication failed', 'error');
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const res = await deleteResume(resumeId);
      if (res.success) {
        addToast('Resume deleted', 'info');
        loadDashboardData();
      }
    }
  };

  const handleViewAnalysis = (analysisId) => {
    navigate(`/analyzer?id=${analysisId}`);
  };

  const handleDeleteAnalysis = async (analysisId) => {
    if (window.confirm('Delete this ATS analysis record?')) {
      const res = await deleteAnalysis(analysisId);
      if (res.success) {
        addToast('Analysis record deleted', 'info');
        loadDashboardData();
      }
    }
  };

  const isPremium = user?.role === 'premium' || user?.role === 'admin';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header Profile & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {user?.name || 'Candidate'}!
            </h1>
            {isPremium ? (
              <Badge variant="primary" size="sm">
                <Crown className="w-3 h-3 text-[#7B61FF]" />
                PRO MEMBER
              </Badge>
            ) : (
              <Badge variant="default" size="sm">Free Tier</Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your ATS scores, manage resume variations, and supercharge your applications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/analyzer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition"
          >
            <ScanSearch className="w-4 h-4 text-[#7B61FF]" />
            <span>Scan Resume</span>
          </Link>

          <Link
            to="/builder"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 shadow-sm hover:shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Resume</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Resumes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Saved Resumes</span>
            <div className="w-8 h-8 rounded-xl bg-[#F3F0FF] text-[#7B61FF] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {resumes.length} {isPremium ? '' : `/ 1`}
          </div>
          <p className="text-[11px] text-slate-400">
            {isPremium ? 'Unlimited creation enabled' : '1 Free active resume slot'}
          </p>
        </div>

        {/* Total Analyses */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">ATS Analyses Run</span>
            <div className="w-8 h-8 rounded-xl bg-[#F3F0FF] text-[#7B61FF] flex items-center justify-center">
              <ScanSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {stats?.totalAnalyses || analysisHistory.length} {isPremium ? '' : `/ 2 this month`}
          </div>
          <p className="text-[11px] text-slate-400">
            {isPremium ? 'Unlimited monthly scans' : 'Resets every 30 days'}
          </p>
        </div>

        {/* Avg ATS Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Avg ATS Score</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 flex items-baseline gap-1">
            <span>{stats?.averageScore || (analysisHistory.length > 0 ? analysisHistory[0]?.overallAtsScore : 0)}</span>
            <span className="text-xs text-slate-400 font-normal">/ 100</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">
            {stats?.highestScore ? `Peak score: ${stats.highestScore}/100` : 'Scan a resume to compute'}
          </p>
        </div>

        {/* Current Plan & Upgrade */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Plan Status</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {isPremium ? 'Pro Active' : 'Free Starter'}
          </div>
          {!isPremium ? (
            <button
              onClick={openUpgradeModal}
              className="text-[11px] font-bold text-[#7B61FF] hover:underline flex items-center gap-1"
            >
              <span>Unlock Unlimited Access</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <p className="text-[11px] text-slate-400">All features unlocked</p>
          )}
        </div>
      </div>

      {/* Free Tier Usage Meter */}
      {!isPremium && stats?.usage && (
        <div className="p-5 rounded-2xl bg-[#F3F0FF]/70 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <AlertCircle className="w-4 h-4 text-[#7B61FF]" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Free Tier Monthly Quota
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Resumes: <strong className="text-slate-900">{resumes.length}/1</strong> | Monthly ATS Scans: <strong className="text-slate-900">{stats.usage.analysesUsedThisMonth}/2</strong>
            </p>
          </div>

          <button
            onClick={openUpgradeModal}
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold bg-[#0f172a] hover:bg-slate-800 text-white shadow-xs transition"
          >
            Upgrade to Pro
          </button>
        </div>
      )}

      {/* Score Trend Chart Section */}
      {stats?.scoreTrend && stats.scoreTrend.length > 1 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#7B61FF]" />
                ATS Score Progression Over Time
              </h3>
              <p className="text-xs text-slate-500">
                Track how your resume improvements correlate with higher ATS scoring.
              </p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.scoreTrend}>
                <defs>
                  <linearGradient id="scoreColorUI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7B61FF" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7B61FF" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
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
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#7B61FF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#scoreColorUI)"
                  name="ATS Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Saved Resumes List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#7B61FF]" />
            My Saved Resumes ({resumes.length})
          </h3>
          <Link
            to="/builder"
            className="text-xs font-bold text-[#7B61FF] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Create New
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-10 rounded-2xl border border-dashed border-slate-200 bg-white space-y-3">
            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-800 font-bold">No saved resumes found.</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Create your first ATS-optimized resume with Gemini AI bullet point assistance.
            </p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Build Resume Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((r) => (
              <div
                key={r._id}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-200 transition space-y-4 flex flex-col justify-between shadow-xs hover:shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-[#7B61FF] font-mono uppercase bg-[#F3F0FF] px-2 py-0.5 rounded border border-indigo-100">
                      {r.templateId || 'Classic ATS'}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(r.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 truncate">{r.title || 'Untitled Resume'}</h4>

                  <p className="text-xs text-slate-600 truncate">
                    {r.sections?.personalInfo?.jobTitle || 'General Software Role'}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleEditResume(r._id)}
                      className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
                      title="Edit resume"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicate(r._id)}
                      className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
                      title="Duplicate copy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteResume(r._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Delete resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEditResume(r._id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F3F0FF] hover:bg-[#e0e7ff] text-[#7B61FF] text-xs font-bold transition"
                  >
                    <span>Open Editor</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past ATS Analyses History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ScanSearch className="w-5 h-5 text-[#7B61FF]" />
            Past ATS Analyses & History ({analysisHistory.length})
          </h3>
          <Link
            to="/analyzer"
            className="text-xs font-bold text-[#7B61FF] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            New Scan
          </Link>
        </div>

        {analysisHistory.length === 0 ? (
          <div className="text-center py-10 rounded-2xl border border-dashed border-slate-200 bg-white space-y-3">
            <ScanSearch className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-800 font-bold">No ATS scan history yet.</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Upload any PDF resume or paste text to receive a comprehensive ATS score breakdown.
            </p>
            <Link
              to="/analyzer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <ScanSearch className="w-4 h-4" />
              Scan Resume Now
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-xs">
            {analysisHistory.map((a) => {
              const score = a.overallAtsScore;
              const badgeColor =
                score >= 80 ? 'primary' : score >= 60 ? 'primary' : score >= 45 ? 'warning' : 'danger';

              return (
                <div
                  key={a._id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <Badge variant={badgeColor} size="lg" className="font-mono text-sm font-extrabold w-14 justify-center">
                      {score}
                    </Badge>

                    <div className="space-y-0.5">
                      <h5 className="text-sm font-bold text-slate-900">{a.resumeFileName || 'Resume Scan'}</h5>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>Role: {a.targetRole || 'General'}</span>
                        <span>•</span>
                        <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleViewAnalysis(a._id)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#7B61FF]" />
                      <span>View Report</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAnalysis(a._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
