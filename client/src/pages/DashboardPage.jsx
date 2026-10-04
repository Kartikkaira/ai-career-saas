import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../services/userApi';
import { useAuthStore } from '../store/authStore';
import { useResumeStore } from '../store/resumeStore';
import { useAnalysisStore } from '../store/analysisStore';
import { useUiStore } from '../store/uiStore';
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
      addToast('Résumé duplicated!', 'success');
      loadDashboardData();
    } else if (res.isUpgradeRequired) {
      openUpgradeModal();
    } else {
      addToast(res.message || 'Duplication failed', 'error');
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this résumé draft?')) {
      const res = await deleteResume(resumeId);
      if (res.success) {
        addToast('Résumé deleted', 'info');
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
    <div className="bg-[#F7F4ED] text-[#15130F] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Profile & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#15130F]/10 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#15130F]">
                Welcome back, <span className="italic font-light">{user?.name || 'Candidate'}</span>
              </h1>
              {isPremium ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#3D4A2E] text-white">
                  PRO
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#EFECE3] text-[#5C564E]">
                  Free Tier
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#5C564E] mt-1.5 font-sans">
              Track your ATS performance, manage variations, and tailor applications.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/analyzer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium text-[#15130F] bg-white hover:bg-[#EFECE3] border border-[#15130F]/15 transition"
            >
              <ScanSearch className="w-3.5 h-3.5 text-[#B8571E]" />
              <span>Scan résumé</span>
            </Link>

            <Link
              to="/builder"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-[#F7F4ED] bg-[#15130F] hover:bg-[#2A1F18] transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New résumé</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Total Resumes */}
          <div className="bg-[#FAF8F3] p-5 rounded-3xl border border-[#15130F]/10 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-[#5C564E]">
              <span className="text-xs font-medium">Saved résumés</span>
              <div className="w-7 h-7 rounded-full bg-[#EFECE3] text-[#15130F] flex items-center justify-center">
                <FileText className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#15130F]">
              {resumes.length} {isPremium ? '' : `/ 1`}
            </div>
            <p className="text-[11px] text-[#8A8277]">
              {isPremium ? 'Unlimited creation enabled' : '1 Free active résumé slot'}
            </p>
          </div>

          {/* Total Analyses */}
          <div className="bg-[#FAF8F3] p-5 rounded-3xl border border-[#15130F]/10 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-[#5C564E]">
              <span className="text-xs font-medium">ATS analyses run</span>
              <div className="w-7 h-7 rounded-full bg-[#EFECE3] text-[#15130F] flex items-center justify-center">
                <ScanSearch className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#15130F]">
              {stats?.totalAnalyses || analysisHistory.length} {isPremium ? '' : `/ 2`}
            </div>
            <p className="text-[11px] text-[#8A8277]">
              {isPremium ? 'Unlimited monthly scans' : 'Resets every 30 days'}
            </p>
          </div>

          {/* Avg ATS Score */}
          <div className="bg-[#FAF8F3] p-5 rounded-3xl border border-[#15130F]/10 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-[#5C564E]">
              <span className="text-xs font-medium">Average ATS score</span>
              <div className="w-7 h-7 rounded-full bg-[#3D4A2E]/15 text-[#3D4A2E] flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#15130F] flex items-baseline gap-1">
              <span>
                {stats?.averageScore || (analysisHistory.length > 0 ? analysisHistory[0]?.overallAtsScore : 0)}
              </span>
              <span className="text-sm font-light text-[#5C564E]">/ 100</span>
            </div>
            <p className="text-[11px] text-[#3D4A2E] font-medium">
              {stats?.highestScore ? `Peak score: ${stats.highestScore}%` : 'Scan a résumé to compute'}
            </p>
          </div>

          {/* Current Plan & Upgrade */}
          <div className="bg-[#FAF8F3] p-5 rounded-3xl border border-[#15130F]/10 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-[#5C564E]">
              <span className="text-xs font-medium">Subscription status</span>
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <Crown className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-normal text-[#15130F]">
              {isPremium ? 'Pro Active' : 'Free Starter'}
            </div>
            {!isPremium ? (
              <button
                onClick={openUpgradeModal}
                className="text-[11px] font-semibold text-[#B8571E] hover:underline flex items-center gap-1"
              >
                <span>Unlock unlimited access</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <p className="text-[11px] text-[#5C564E]">All executive templates unlocked</p>
            )}
          </div>
        </div>

        {/* Free Tier Usage Meter */}
        {!isPremium && stats?.usage && (
          <div className="p-5 rounded-3xl bg-[#FAF8F3] border border-[#B8571E]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <AlertCircle className="w-4 h-4 text-[#B8571E]" />
                <span className="text-xs font-medium text-[#15130F]">
                  Free tier monthly quota
                </span>
              </div>
              <p className="text-xs text-[#5C564E]">
                Résumés: <strong className="text-[#15130F]">{resumes.length}/1</strong> | Monthly ATS scans: <strong className="text-[#15130F]">{stats.usage.analysesUsedThisMonth}/2</strong>
              </p>
            </div>

            <button
              onClick={openUpgradeModal}
              className="shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#15130F] hover:bg-[#2A1F18] text-[#F7F4ED] shadow-xs transition"
            >
              Upgrade to Pro
            </button>
          </div>
        )}

        {/* Score Trend Chart Section */}
        {stats?.scoreTrend && stats.scoreTrend.length > 1 && (
          <div className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#15130F]/10 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#15130F]/10 pb-3">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#15130F] flex items-center gap-2">
                  <span>ATS score progression</span>
                </h3>
                <p className="text-xs text-[#5C564E] mt-0.5">
                  Track how your bullet rewrites correlate with higher benchmark scores.
                </p>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.scoreTrend}>
                  <defs>
                    <linearGradient id="scoreColorUI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B8571E" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#B8571E" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(21, 19, 15, 0.08)" />
                  <XAxis dataKey="date" stroke="#8A8277" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} stroke="#8A8277" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FAF8F3',
                      borderColor: 'rgba(21, 19, 15, 0.15)',
                      borderRadius: '16px',
                      color: '#15130F',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#B8571E"
                    strokeWidth={2.5}
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
            <h3 className="font-serif text-2xl font-normal text-[#15130F]">
              My saved résumés ({resumes.length})
            </h3>
            <Link
              to="/builder"
              className="text-xs font-semibold text-[#15130F] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create new</span>
            </Link>
          </div>

          {resumes.length === 0 ? (
            <div className="text-center py-12 rounded-3xl border border-dashed border-[#15130F]/20 bg-[#FAF8F3] space-y-3">
              <FileText className="w-8 h-8 text-[#8A8277] mx-auto" />
              <p className="font-serif text-lg font-normal text-[#15130F]">No saved résumés found</p>
              <p className="text-xs text-[#5C564E] max-w-sm mx-auto">
                Create your first ATS-optimized résumé with Gemini AI bullet assistance.
              </p>
              <Link
                to="/builder"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#15130F] hover:bg-[#2A1F18] text-[#F7F4ED] rounded-full text-xs font-semibold shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Build résumé now</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {resumes.map((r) => (
                <div
                  key={r._id}
                  className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#15130F]/10 hover:border-[#15130F]/30 transition space-y-4 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-medium text-[#15130F] px-2.5 py-0.5 rounded-full bg-[#EFECE3] border border-[#15130F]/10">
                        {r.templateId || 'Classic ATS'}
                      </span>
                      <span className="text-[11px] text-[#8A8277] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(r.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-normal text-[#15130F] truncate">
                      {r.title || 'Untitled Résumé'}
                    </h4>

                    <p className="text-xs text-[#5C564E] truncate">
                      {r.sections?.personalInfo?.jobTitle || 'General Position Candidate'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#15130F]/10 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleEditResume(r._id)}
                        className="p-2 text-[#5C564E] hover:text-[#15130F] rounded-full hover:bg-white transition"
                        title="Edit résumé"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDuplicate(r._id)}
                        className="p-2 text-[#5C564E] hover:text-[#15130F] rounded-full hover:bg-white transition"
                        title="Duplicate copy"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteResume(r._id)}
                        className="p-2 text-[#8A8277] hover:text-rose-700 rounded-full hover:bg-rose-50 transition"
                        title="Delete résumé"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleEditResume(r._id)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18] text-xs font-medium transition"
                    >
                      <span>Open editor</span>
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
            <h3 className="font-serif text-2xl font-normal text-[#15130F]">
              Diagnostic scan history ({analysisHistory.length})
            </h3>
            <Link
              to="/analyzer"
              className="text-xs font-semibold text-[#15130F] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New scan</span>
            </Link>
          </div>

          {analysisHistory.length === 0 ? (
            <div className="text-center py-12 rounded-3xl border border-dashed border-[#15130F]/20 bg-[#FAF8F3] space-y-3">
              <ScanSearch className="w-8 h-8 text-[#8A8277] mx-auto" />
              <p className="font-serif text-lg font-normal text-[#15130F]">No diagnostic scans yet</p>
              <p className="text-xs text-[#5C564E] max-w-sm mx-auto">
                Upload any PDF résumé or paste text to receive a comprehensive ATS score breakdown.
              </p>
              <Link
                to="/analyzer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#15130F] hover:bg-[#2A1F18] text-[#F7F4ED] rounded-full text-xs font-semibold shadow-xs"
              >
                <ScanSearch className="w-3.5 h-3.5" />
                <span>Scan résumé now</span>
              </Link>
            </div>
          ) : (
            <div className="bg-[#FAF8F3] rounded-3xl border border-[#15130F]/10 overflow-hidden divide-y divide-[#15130F]/10 shadow-xs">
              {analysisHistory.map((a) => {
                const score = a.overallAtsScore;
                return (
                  <div
                    key={a._id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#EFECE3] border border-[#15130F]/10 flex flex-col items-center justify-center font-serif text-base text-[#15130F]">
                        <span>{score}</span>
                        <span className="text-[9px] font-sans text-[#5C564E]">ATS</span>
                      </div>

                      <div className="space-y-0.5">
                        <h5 className="font-serif text-base font-normal text-[#15130F]">
                          {a.resumeFileName || 'Diagnostic Résumé Scan'}
                        </h5>
                        <div className="flex items-center gap-2 text-xs text-[#5C564E]">
                          <span>Role: {a.targetRole || 'General'}</span>
                          <span>·</span>
                          <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => handleViewAnalysis(a._id)}
                        className="px-4 py-2 rounded-full bg-white hover:bg-[#EFECE3] border border-[#15130F]/15 text-[#15130F] text-xs font-medium flex items-center gap-1.5 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#B8571E]" />
                        <span>View report</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteAnalysis(a._id)}
                        className="p-2 text-[#8A8277] hover:text-rose-700 rounded-full transition"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
