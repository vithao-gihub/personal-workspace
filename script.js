document.addEventListener('DOMContentLoaded', () => {
    // Chốt chặn an toàn chống khởi tạo kép nếu script vô tình được nạp nhiều lần
    if (window.__PERSONAL_WORKSPACE_INITIALIZED__) return;
    window.__PERSONAL_WORKSPACE_INITIALIZED__ = true;

    // =========================================================================
    // 1. KHAI BÁO CÁC PHẦN TỬ DOM (DOM ELEMENTS)
    // =========================================================================
    // Cài đặt, Sao lưu & Khôi phục
    const btnToggleDataMenu = document.getElementById('btnToggleDataMenu');
    const dataDropdownPanel = document.getElementById('dataDropdownPanel');
    const btnExportJson = document.getElementById('btn-export-json');
    const btnImportJson = document.getElementById('btn-import-json');
    const importJsonInput = document.getElementById('importJsonInput');
    const btnOpenSettings = document.getElementById('btn-open-settings');
    const settingsModal = document.getElementById('settingsModal') || document.getElementById('settings-modal');
    const btnCloseSettingsModal = document.getElementById('btn-close-settings-modal');
    const settingsForm = document.getElementById('settings-form');
    const settingFocusTime = document.getElementById('setting-focus-time');
    const settingShortBreak = document.getElementById('setting-short-break');
    const settingLongBreak = document.getElementById('setting-long-break');
    const settingEnableSound = document.getElementById('setting-enable-sound');
    const btnResetSettings = document.getElementById('btn-reset-settings');

        // Giao diện Sáng / Tối (Theme Toggle)
    const THEME_STORAGE_KEY = 'personal_workspace_theme_v1';
    const btnToggleTheme = document.getElementById('btn-toggle-theme');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const themeToggleText = document.getElementById('theme-toggle-text');

    // Thông báo đẩy trình duyệt (Web Notification)
    const btnRequestNotif = document.getElementById('btn-request-notif');
    const btnRequestNotifText = document.getElementById('btn-request-notif-text');
    const btnPomoNotifToggle = document.getElementById('btn-pomo-notif-toggle');
    const pomoNotifBtnText = document.getElementById('pomo-notif-btn-text');
    const notifStatusBadge = document.getElementById('notif-status-badge');
    const DEFAULT_DOCUMENT_TITLE = 'Personal Workspace - Quản lý cá nhân';

    // Header & Điều hướng Tab
    const navBtnTasks = document.getElementById('nav-btn-tasks');
    const navBtnTime = document.getElementById('nav-btn-time');
    const navBtnHabits = document.getElementById('nav-btn-habits');
    const navBtnNotes = document.getElementById('nav-btn-notes');
    const headerModuleBadge = document.getElementById('header-module-badge');
    const headerModuleTitle = document.getElementById('header-module-title');
    const headerModuleSlogan = document.getElementById('header-module-slogan');
    const moduleTasksView = document.getElementById('module-tasks-view');
    const moduleTimeView = document.getElementById('module-time-view');
    const moduleHabitsView = document.getElementById('module-habits-view');
    const moduleNotesView = document.getElementById('module-notes-view');

    // Form tạo công việc chính
    const taskForm = document.getElementById('task-form');
    const titleInput = document.getElementById('task-title');
    const categoryInput = document.getElementById('task-category');
    const priorityInput = document.getElementById('task-priority');
    const dueDateInput = document.getElementById('task-due-date');
    const recurringInput = document.getElementById('taskRecurringInput') || document.getElementById('task-recurring');
    const quadrantInput = document.getElementById('task-quadrant');

    // Không gian hiển thị Công việc (List View & Matrix View)
    const tasksWorkspace = document.getElementById('tasks-workspace');
    const listViewContainer = document.getElementById('list-view-container');
    const matrixViewContainer = document.getElementById('matrix-view-container');
    const taskListEl = document.getElementById('task-list');

    const matrixLists = {
        q1: document.getElementById('matrix-list-q1'),
        q2: document.getElementById('matrix-list-q2'),
        q3: document.getElementById('matrix-list-q3'),
        q4: document.getElementById('matrix-list-q4')
    };
    const matrixCounts = {
        q1: document.getElementById('count-q1'),
        q2: document.getElementById('count-q2'),
        q3: document.getElementById('count-q3'),
        q4: document.getElementById('count-q4')
    };
    const quadrantCards = document.querySelectorAll('.quadrant-card');
    const quickAddForms = document.querySelectorAll('.quadrant-quick-add');

    // Dashboard Thống kê Mini 4 ô
    const statTotalEl = document.getElementById('stat-total');
    const statCompletedEl = document.getElementById('stat-completed');
    const statPendingEl = document.getElementById('stat-pending');
    const statProgressTextEl = document.getElementById('stat-progress-text');
    const statProgressBarEl = document.getElementById('stat-progress-bar');
        const statUrgentEl = document.getElementById('stat-urgent');

    // Thanh Tìm kiếm & Bộ lọc Popover Gom Gọn (Unified Compact Filter)
    const filterKeywordInput = document.getElementById('filterKeywordInput') || document.getElementById('search-task-input');
    const searchTaskInput = filterKeywordInput;
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterPopoverContainer = document.getElementById('filterPopoverContainer');
    const btnToggleFilterDropdown = document.getElementById('btnToggleFilterDropdown');
    const filterDropdownPanel = document.getElementById('filterDropdownPanel');
    const btnCloseFilterPanel = document.getElementById('btnCloseFilterPanel');
    const btnApplyFilter = document.getElementById('btnApplyFilter');
    const filterCategorySelect = document.getElementById('filterCategorySelect') || document.getElementById('filter-category');
    const filterPrioritySelect = document.getElementById('filterPrioritySelect') || document.getElementById('filter-priority');
    const filterDueDateSelect = document.getElementById('filterDueDateSelect') || document.getElementById('filter-due-date');
    const filterStatusSelect = document.getElementById('filterStatusSelect') || document.getElementById('filter-status');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn') || document.getElementById('btn-reset-filters');
    const activeFiltersBadge = document.getElementById('activeFiltersBadge');
    const activeFilterChipsContainer = document.getElementById('activeFilterChipsContainer');
    const activeFilterChipsList = document.getElementById('activeFilterChipsList');
    const btnClearAllFilterChips = document.getElementById('btnClearAllFilterChips');
    const taskSortSelect = document.getElementById('taskSortSelect');
    const btnViewList = document.getElementById('btn-view-list');
    const btnViewMatrix = document.getElementById('btn-view-matrix');

    // Modal 1: Cập nhật thông tin bổ sung khi thêm nhanh
    const updateModal = document.getElementById('update-modal');
    const modalForm = document.getElementById('modal-form');
    const modalTaskNameEl = document.getElementById('modal-task-name');
    const modalCategoryInput = document.getElementById('modal-category');
    const modalPriorityInput = document.getElementById('modal-priority');
    const modalDueDateInput = document.getElementById('modal-due-date');
    const modalRecurringInput = document.getElementById('modalRecurringInput') || document.getElementById('modal-recurring');
    const modalQuadrantInput = document.getElementById('modal-quadrant');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnSkipModal = document.getElementById('btn-skip-modal');

    // Modal 2: Quản lý Loại việc (Category Manager)
    const btnOpenCatManager = document.getElementById('btn-open-cat-manager');
    const categoryModal = document.getElementById('category-modal');
    const btnCloseCatModal = document.getElementById('btn-close-cat-modal');
    const categoryForm = document.getElementById('category-form');
    const catFormModeLabel = document.getElementById('cat-form-mode-label');
    const btnCancelCatEdit = document.getElementById('btn-cancel-cat-edit');
    const catIconInput = document.getElementById('cat-icon-input');
    const catNameInput = document.getElementById('cat-name-input');
    const catColorInput = document.getElementById('cat-color-input');
    const btnSaveCategory = document.getElementById('btn-save-category');
    const emojiSuggestions = document.getElementById('emoji-suggestions');
    const categoryManagerListEl = document.getElementById('category-manager-list');
    const catLivePreview = document.getElementById('cat-live-preview');
    const catPreviewIcon = document.getElementById('cat-preview-icon');
    const catPreviewName = document.getElementById('cat-preview-name');

    // Hiệu ứng Chúc mừng & Victory State
    const dailyCelebrationBanner = document.getElementById('daily-celebration-banner');
    const btnCloseDailyBanner = document.getElementById('btn-close-daily-banner');
    const victoryStateCard = document.getElementById('victory-state-card');
    const btnVictoryAddNew = document.getElementById('btn-victory-add-new');
    const btnVictoryReload = document.getElementById('btn-victory-reload');
    const confettiCanvas = document.getElementById('confetti-canvas');

    // Module 2: Đồng hồ Pomodoro & Theo dõi Thời gian
    const focusTaskSelect = document.getElementById('focus-task-select');
    const focusTaskMinutesEl = document.getElementById('focus-task-minutes');
    const btnCompleteFocusedTask = document.getElementById('btn-complete-focused-task');
    const focusTaskMetaBar = document.getElementById('focus-task-meta-bar');
    const focusMetaCategory = document.getElementById('focus-meta-category');
    const focusMetaQuadrant = document.getElementById('focus-meta-quadrant');
    const focusMetaPriority = document.getElementById('focus-meta-priority');
    const focusMetaDue = document.getElementById('focus-meta-due');

    const pomodoroCard = document.getElementById('pomodoro-card');
    const pomoModeBtns = document.querySelectorAll('.pomo-mode-btn');
    const pomoRingProgress = document.getElementById('pomo-ring-progress');
    const pomoStatusBadge = document.getElementById('pomo-status-badge');
    const pomoTimeDisplay = document.getElementById('pomo-time-display');
    const pomoCycleCounter = document.getElementById('pomo-cycle-counter');
    const btnPomoStart = document.getElementById('btn-pomo-start');
    const btnPomoPause = document.getElementById('btn-pomo-pause');
    const btnPomoReset = document.getElementById('btn-pomo-reset');

    const pomoStatTodayCyclesEl = document.getElementById('pomo-stat-today-cycles');
    const pomoStatTodayMinutesEl = document.getElementById('pomo-stat-today-minutes');
    const totalActualTimeAllEl = document.getElementById('total-actual-time-all');
    const totalTrackedTasksEl = document.getElementById('total-tracked-tasks');
    const timeTrackedListEl = document.getElementById('time-tracked-list');

    // =========================================================================
    // 2. LOCALSTORAGE KEYS CHUẨN HÓA & KHỞI TẠO DỮ LIỆU
    // =========================================================================
    const TASKS_STORAGE_KEY = 'personal_workspace_tasks_v1';
    const CATEGORIES_STORAGE_KEY = 'personal_workspace_categories_v1';
    const VIEW_MODE_STORAGE_KEY = 'personal_workspace_view_mode_v1';
    const POMO_STATS_STORAGE_KEY = 'personal_workspace_pomo_stats_v1';
    const POMO_SETTINGS_STORAGE_KEY = 'personal_workspace_pomo_settings_v1';

    function getTodayISO() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getOffsetDateISO(daysOffset) {
        const d = new Date();
        d.setDate(d.getDate() + daysOffset);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const defaultCategories = [
        { id: 'cat-work', name: 'Công việc', icon: '💼', color: '#2563EB' },
        { id: 'cat-personal', name: 'Cá nhân', icon: '🏠', color: '#16A34A' },
        { id: 'cat-study', name: 'Học tập', icon: '📚', color: '#9333EA' },
        { id: 'cat-finance', name: 'Tài chính', icon: '💰', color: '#D97706' }
    ];

    const defaultTasks = [
        {
            id: 'task-1',
            title: 'Thiết kế kiến trúc cơ sở dữ liệu cho hệ thống quản lý cá nhân',
            categoryId: 'cat-work',
            priority: 'high',
            dueDate: getTodayISO(),
            quadrant: 'q1',
            scope: 'short',
            recurring: 'daily',
            lastResetDate: getTodayISO(),
            status: 'pending',
            actualTime: 25
        },
        {
            id: 'task-2',
            title: 'Hoàn thiện lộ trình học tập và ôn luyện chứng chỉ chuyên ngành',
            categoryId: 'cat-study',
            priority: 'high',
            dueDate: getOffsetDateISO(6),
            quadrant: 'q2',
            scope: 'medium',
            recurring: 'none',
            lastResetDate: getTodayISO(),
            status: 'pending',
            actualTime: 0
        },
        {
            id: 'task-3',
            title: 'Phản hồi email hành chính và đặt lịch họp nhóm tuần tới',
            categoryId: 'cat-work',
            priority: 'medium',
            dueDate: getOffsetDateISO(1),
            quadrant: 'q3',
            scope: 'short',
            recurring: 'weekly',
            lastResetDate: getTodayISO(),
            status: 'pending',
            actualTime: 0
        },
        {
            id: 'task-4',
            title: 'Dọn dẹp thư mục tải xuống và sắp xếp lại hình nền máy tính',
            categoryId: 'cat-personal',
            priority: 'low',
            dueDate: getOffsetDateISO(12),
            quadrant: 'q4',
            scope: 'medium',
            recurring: 'none',
            lastResetDate: getTodayISO(),
            status: 'completed',
            actualTime: 15
        }
    ];

    function loadJSONFromStorage(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return fallback;
            const parsed = JSON.parse(raw);
            return parsed !== null && parsed !== undefined ? parsed : fallback;
        } catch (err) {
            return fallback;
        }
    }

    let categories = loadJSONFromStorage(CATEGORIES_STORAGE_KEY, defaultCategories);
    if (!Array.isArray(categories) || categories.length === 0) {
        categories = [...defaultCategories];
    }

    let tasks = loadJSONFromStorage(TASKS_STORAGE_KEY, defaultTasks);
    if (!Array.isArray(tasks)) {
        tasks = [...defaultTasks];
    }

    let currentViewMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY) || 'list';
    if (currentViewMode !== 'list' && currentViewMode !== 'matrix') {
        currentViewMode = 'list';
    }

    function loadPomoStats() {
        const today = getTodayISO();
        const rawStats = loadJSONFromStorage(POMO_STATS_STORAGE_KEY, null);
        if (!rawStats || typeof rawStats !== 'object' || rawStats.date !== today) {
            return {
                date: today,
                completedCycles: 0,
                totalFocusMinutes: 0
            };
        }
        return {
            date: today,
            completedCycles: Number(rawStats.completedCycles) || 0,
            totalFocusMinutes: Number(rawStats.totalFocusMinutes) || 0
        };
    }

    let pomoStats = loadPomoStats();

    const DEFAULT_POMO_SETTINGS = {
        focusTime: 25,
        shortBreak: 5,
        longBreak: 15,
        enableSound: true
    };

    function loadPomoSettings() {
        const raw = loadJSONFromStorage(POMO_SETTINGS_STORAGE_KEY, null);
        if (!raw || typeof raw !== 'object') {
            return { ...DEFAULT_POMO_SETTINGS };
        }
        return {
            focusTime: Number(raw.focusTime ?? raw.focusMinutes) || DEFAULT_POMO_SETTINGS.focusTime,
            shortBreak: Number(raw.shortBreak ?? raw.shortBreakMinutes) || DEFAULT_POMO_SETTINGS.shortBreak,
            longBreak: Number(raw.longBreak ?? raw.longBreakMinutes) || DEFAULT_POMO_SETTINGS.longBreak,
            enableSound: raw.enableSound !== false
        };
    }

    let pomoSettings = loadPomoSettings();

    function savePomoSettingsToStorage() {
        const toSave = {
            focusTime: Number(pomoSettings.focusTime) || DEFAULT_POMO_SETTINGS.focusTime,
            shortBreak: Number(pomoSettings.shortBreak) || DEFAULT_POMO_SETTINGS.shortBreak,
            longBreak: Number(pomoSettings.longBreak) || DEFAULT_POMO_SETTINGS.longBreak,
            enableSound: pomoSettings.enableSound !== false
        };
        localStorage.setItem(POMO_SETTINGS_STORAGE_KEY, JSON.stringify(toSave));
    }

    function applyPomoSettings() {
        if (!POMO_MODES) return;
        const focusMins = Number(pomoSettings.focusTime) || 25;
        const shortMins = Number(pomoSettings.shortBreak) || 5;
        const longMins = Number(pomoSettings.longBreak) || 15;

        POMO_MODES['focus'].minutes = focusMins;
        POMO_MODES['short-break'].minutes = shortMins;
        POMO_MODES['long-break'].minutes = longMins;

        // Cập nhật nhãn nút Pomodoro
        const focusBtnSpan = document.querySelector('.pomo-mode-btn[data-mode="focus"] span');
        if (focusBtnSpan) focusBtnSpan.textContent = "Tập trung (" + focusMins + "p)";

        const shortBtnSpan = document.querySelector('.pomo-mode-btn[data-mode="short-break"] span');
        if (shortBtnSpan) shortBtnSpan.textContent = "Nghỉ ngắn (" + shortMins + "p)";

        const longBtnSpan = document.querySelector('.pomo-mode-btn[data-mode="long-break"] span');
        if (longBtnSpan) longBtnSpan.textContent = "Nghỉ dài (" + longMins + "p)";

        if (!isTimerRunning) {
            totalModeSeconds = POMO_MODES[currentPomoMode].minutes * 60;
            remainingSeconds = totalModeSeconds;
            updateTimerDisplay();
        }
    }

    let currentSearchQuery = '';
    let currentStatusFilter = 'all';
    let currentCategoryFilter = 'all';
    let currentPriorityFilter = 'all';
    let currentDueDateFilter = 'all';
    let currentSortMode = 'smart';

    let pendingModalTaskId = null;
    let editingCategoryId = null;
    let isQuadrantManuallySelected = false;
    let draggedTaskId = null;
    let expandedSubtaskTaskIds = new Set();

    // =========================================================================
    // 3. CÁC HÀM TIỆN ÍCH & CHUẨN HÓA DỮ LIỆU
    // =========================================================================
    function removeVietnameseTones(str) {
        if (!str) return '';
        str = String(str).toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
        str = str.replace(/\u02C6|\u0306|\u031B/g, '');
        return str.trim();
    }

    function saveTasksToStorage() {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }

    function saveCategoriesToStorage() {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    }

    function saveViewModeToStorage() {
        localStorage.setItem(VIEW_MODE_STORAGE_KEY, currentViewMode);
    }

    function savePomoStatsToStorage() {
        const today = getTodayISO();
        if (pomoStats.date !== today) {
            pomoStats = { date: today, completedCycles: 0, totalFocusMinutes: 0 };
        }
        localStorage.setItem(POMO_STATS_STORAGE_KEY, JSON.stringify(pomoStats));
    }

    function generateUniqueId(prefix = 'id') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    }

    function formatDateVN(dateString) {
        if (!dateString) return 'Chưa đặt hạn';
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString;
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

    /**
     * Thuật toán tự động gợi ý Góc Ma trận Eisenhower (Q1, Q2, Q3, Q4)
     */
    function suggestEisenhowerQuadrant(priority, dueDate) {
        let isUrgent = false;
        if (dueDate) {
            const today = new Date(getTodayISO() + 'T00:00:00');
            const target = new Date(dueDate + 'T00:00:00');
            const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
            isUrgent = diffDays <= 2;
        } else {
            isUrgent = priority === 'high';
        }

        if (priority === 'high') {
            return isUrgent ? 'q1' : 'q2';
        }
        if (priority === 'medium' || !priority || priority === 'none') {
            return isUrgent ? 'q3' : 'q2';
        }
        return isUrgent ? 'q3' : 'q4';
    }


    /**
     * Tính toán Phân loại Kỳ hạn (scope):
     * <= 3 ngày: 'short' (Ngắn hạn)
     * 4 - 14 ngày: 'medium' (Trung hạn)
     * > 14 ngày hoặc không hạn: 'long' (Dài hạn)
     */
    function calculateTaskScope(dueDate) {
        if (!dueDate) return 'long';
        const today = new Date(getTodayISO() + 'T00:00:00');
        const target = new Date(dueDate + 'T00:00:00');
        const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 3) return 'short';
        if (diffDays <= 14) return 'medium';
        return 'long';
    }

    function getScopeLabel(scope) {
        if (scope === 'short') return 'Ngắn hạn';
        if (scope === 'medium') return 'Trung hạn';
        return 'Dài hạn';
    }

    /**
     * Lấy ngày Thứ 2 đầu tuần của một ngày bất kỳ (YYYY-MM-DD)
     */
    function getMondayOfDate(dateStr) {
        const d = new Date(dateStr + 'T00:00:00');
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(d.setDate(diff));
        const year = monday.getFullYear();
        const month = String(monday.getMonth() + 1).padStart(2, '0');
        const date = String(monday.getDate()).padStart(2, '0');
        return `${year}-${month}-${date}`;
    }

    /**
     * Tự động kiểm tra và Reset công việc định kỳ (Recurring Tasks):
     * - Hằng ngày (daily): Sang ngày mới (today > lastResetDate) & status === 'completed' -> reset về pending.
     * - Hằng tuần (weekly): Bước sang tuần mới (lastResetDate < mondayOfCurrentWeek) & status === 'completed' -> reset về pending.
     */
    function checkAndResetRecurringTasks() {
        const today = getTodayISO();
        const currentWeekMonday = getMondayOfDate(today);
        let hasChanged = false;

        // Đọc mảng personal_workspace_tasks_v1 từ LocalStorage để đảm bảo đồng bộ
        const storedTasks = loadJSONFromStorage(TASKS_STORAGE_KEY, tasks);
        if (Array.isArray(storedTasks)) {
            tasks = storedTasks;
        }

        tasks = tasks.map(task => {
            const recurring = task.recurring || 'none';
            const lastReset = task.lastResetDate || task.dueDate || today;

            // 1. Task recurring === 'daily': Nếu status === 'completed' VÀ today > lastResetDate (đã sang ngày mới)
            if (recurring === 'daily') {
                if (today > lastReset && task.status === 'completed') {
                    hasChanged = true;
                    return {
                        ...task,
                        status: 'pending',
                        lastResetDate: today
                    };
                }
            } 
            // 2. Task recurring === 'weekly': Kiểm tra tuần hiện tại khác tuần của lastResetDate
            else if (recurring === 'weekly') {
                if (lastReset < currentWeekMonday && task.status === 'completed') {
                    hasChanged = true;
                    return {
                        ...task,
                        status: 'pending',
                        lastResetDate: today
                    };
                }
            }

            if (!task.recurring || !task.lastResetDate) {
                return {
                    ...task,
                    recurring: task.recurring || 'none',
                    lastResetDate: task.lastResetDate || today
                };
            }

            return task;
        });

        // 3. Lưu lại mảng Task đã cập nhật vào LocalStorage và trigger re-render
        if (hasChanged) {
            saveTasksToStorage();
            renderTasks();
            updateDashboardStats();
        }
    }

    /**
     * THUẬT TOÁN SẮP XẾP TỰ ĐỘNG THÔNG MINH (SMART AUTO-SORTING)
     * Tiêu chí 1: Task chưa xong (pending / in-progress) nằm trên, task completed nằm dưới cùng.
     * Tiêu chí 2: Task quá hạn / gần đến hạn nhất nằm trên cùng.
     * Tiêu chí 3: Độ quan trọng cao hơn nằm trên (Q1 -> Q2 -> Q3 -> Q4, rồi Ưu tiên Cao -> Trung bình -> Thấp).
     */
    /**
     * THUẬT TOÁN SẮP XẾP TỰ ĐỘNG THÔNG MINH ĐA TẦNG (SMART AUTO-SORTING)
     * TẦNG 1: TRẠNG THÁI HOÀN THÀNH (STATUS)
     *   - Task chưa xong (pending / in-progress) luôn xếp TRÊN.
     *   - Task đã hoàn thành (completed) đẩy xuống DƯỚI CÙNG.
     * TẦNG 2: THỜI HẠN ĐẾN HẠN (DUE DATE & URGENCY)
     *   - Task quá hạn (overdue) và gấp (hôm nay/ngày mai) lên TOP đầu.
     *   - Sắp xếp tăng dần theo dueDate (ngày gần nhất xếp trước, ngày xa hơn xếp sau).
     *   - Task không cài ngày đến hạn xếp sau các task có ngày đến hạn.
     * TẦNG 3: MỨC ƯU TIÊN / MA TRẬN EISENHOWER (PRIORITY / QUADRANT)
     *   - Nếu 2 task cùng độ khẩn cấp ngày hạn: Q1 (hoặc High) > Q2 (Medium) > Q3 (Low) > Q4.
     */
    function sortTasks(taskList, sortMode = currentSortMode) {
        const quadrantWeight = { q1: 1, q2: 2, q3: 3, q4: 4 };
        const priorityWeight = { high: 1, medium: 2, low: 3, none: 4 };

        return [...taskList].sort((a, b) => {
            // TẦNG 1: TRẠNG THÁI HOÀN THÀNH (STATUS)
            const aCompleted = a.status === 'completed' ? 1 : 0;
            const bCompleted = b.status === 'completed' ? 1 : 0;
            if (aCompleted !== bCompleted) {
                return aCompleted - bCompleted;
            }

            // CHẾ ĐỘ 1: HẠN HOÀN THÀNH GẦN NHẤT
            if (sortMode === 'dueDate') {
                const hasDateA = Boolean(a.dueDate);
                const hasDateB = Boolean(b.dueDate);
                if (hasDateA && hasDateB) {
                    if (a.dueDate !== b.dueDate) return a.dueDate.localeCompare(b.dueDate);
                } else if (hasDateA && !hasDateB) {
                    return -1;
                } else if (!hasDateA && hasDateB) {
                    return 1;
                }
                const pA = priorityWeight[a.priority] || 4;
                const pB = priorityWeight[b.priority] || 4;
                return pA - pB;
            }

            // CHẾ ĐỘ 2: MỨC ƯU TIÊN (CAO ➔ THẤP)
            if (sortMode === 'priority') {
                const pA = priorityWeight[a.priority] || 4;
                const pB = priorityWeight[b.priority] || 4;
                if (pA !== pB) return pA - pB;

                const qA = quadrantWeight[a.quadrant] || 2;
                const qB = quadrantWeight[b.quadrant] || 2;
                if (qA !== qB) return qA - qB;

                const hasDateA = Boolean(a.dueDate);
                const hasDateB = Boolean(b.dueDate);
                if (hasDateA && hasDateB) {
                    if (a.dueDate !== b.dueDate) return a.dueDate.localeCompare(b.dueDate);
                } else if (hasDateA && !hasDateB) {
                    return -1;
                } else if (!hasDateA && hasDateB) {
                    return 1;
                }
                return 0;
            }

            // CHẾ ĐỘ 3: MỚI TẠO GẦN ĐÂY
            if (sortMode === 'created') {
                const idxA = tasks.findIndex(t => String(t.id) === String(a.id));
                const idxB = tasks.findIndex(t => String(t.id) === String(b.id));
                return idxA - idxB;
            }

            // MẶC ĐỊNH: SẮP XẾP THÔNG MINH (3 TẦNG ĐA TẦNG)
            // TẦNG 2: Hạn chót & Khẩn cấp
            const hasDateA = Boolean(a.dueDate);
            const hasDateB = Boolean(b.dueDate);
            if (hasDateA && hasDateB) {
                if (a.dueDate !== b.dueDate) {
                    return a.dueDate.localeCompare(b.dueDate);
                }
            } else if (hasDateA && !hasDateB) {
                return -1;
            } else if (!hasDateA && hasDateB) {
                return 1;
            }

            // TẦNG 3: Ma trận Eisenhower & Mức ưu tiên
            const qA = quadrantWeight[a.quadrant] || 2;
            const qB = quadrantWeight[b.quadrant] || 2;
            if (qA !== qB) {
                return qA - qB;
            }

            const pA = priorityWeight[a.priority] || 4;
            const pB = priorityWeight[b.priority] || 4;
            if (pA !== pB) {
                return pA - pB;
            }

            return 0;
        });
    }

    // Chuẩn hóa toàn bộ công việc hiện có để đảm bảo đầy đủ thuộc tính bắt buộc
    tasks = tasks.map(task => {
        const normalizedStatus = task.status === 'completed'
            ? 'completed'
            : (task.status === 'in-progress' ? 'in-progress' : 'pending');
        const resolvedDueDate = task.dueDate || '';
        return {
            ...task,
            id: String(task.id || generateUniqueId('task')),
            title: String(task.title || 'Công việc chưa đặt tên'),
            categoryId: task.categoryId || 'cat-work',
            priority: task.priority || 'medium',
            dueDate: resolvedDueDate,
            quadrant: task.quadrant || suggestEisenhowerQuadrant(task.priority, resolvedDueDate),
            scope: task.scope || calculateTaskScope(resolvedDueDate),
            recurring: task.recurring || 'none',
            lastResetDate: task.lastResetDate || getTodayISO(),
            subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
            status: normalizedStatus,
            actualTime: typeof task.actualTime === 'number' && !isNaN(task.actualTime) ? task.actualTime : 0
        };
    });

    function getQuadrantConfig(quadrant) {
        const configs = {
            q1: { class: 'quadrant-badge-q1', dot: '🔴', shortLabel: 'Ô 1: Làm ngay', fullLabel: '🔴 Ô 1: Làm ngay (Khẩn cấp & Quan trọng)' },
            q2: { class: 'quadrant-badge-q2', dot: '🔵', shortLabel: 'Ô 2: Lên kế hoạch', fullLabel: '🔵 Ô 2: Lên kế hoạch (Quan trọng)' },
            q3: { class: 'quadrant-badge-q3', dot: '🟡', shortLabel: 'Ô 3: Ủy quyền', fullLabel: '🟡 Ô 3: Ủy quyền / Làm nhanh' },
            q4: { class: 'quadrant-badge-q4', dot: '⚪', shortLabel: 'Ô 4: Tối thiểu', fullLabel: '⚪ Ô 4: Tối thiểu / Xóa' }
        };
        return configs[quadrant] || configs.q2;
    }

    function getCategoryBadgeStyle(hexColor) {
        let hex = (hexColor || '#2563EB').replace('#', '').trim();
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        if (hex.length !== 6) {
            hex = '2563EB';
        }
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `background-color: rgba(${r}, ${g}, ${b}, 0.15); color: #${hex}; border: 1px solid rgba(${r}, ${g}, ${b}, 0.35);`;
    }

    function getCategoryById(categoryId) {
        const found = categories.find(c => String(c.id) === String(categoryId));
        if (found) return found;
        return { id: 'none', name: 'Chưa phân loại', icon: '📁', color: '#64748B' };
    }

    function getPriorityConfig(priority) {
        const configs = {
            high: { class: 'badge-high', icon: 'ri-fire-fill', label: 'Ưu tiên cao' },
            medium: { class: 'badge-medium', icon: 'ri-flag-2-fill', label: 'Trung bình' },
            low: { class: 'badge-low', icon: 'ri-leaf-fill', label: 'Ưu tiên thấp' },
            none: { class: 'badge-none', icon: 'ri-question-line', label: 'Chưa chọn ưu tiên' }
        };
        return configs[priority] || configs.none;
    }

    function getStatusLabel(status) {
        if (status === 'completed') return 'Đã hoàn thành';
        if (status === 'in-progress') return 'Đang thực hiện';
        return 'Cần làm';
    }

    /**
     * Cảnh báo Hạn hoàn thành & Phân loại Ngắn / Trung / Dài hạn
     * (🟢 An toàn, 🟡 Gần đến hạn, 🟠 Đến hạn/Gấp, 🔴 Quá hạn)
     */
    function getDeadlineAndTermInfo(dueDate, status) {
        if (!dueDate) {
            return {
                class: 'badge-none',
                displayText: '<i class="ri-calendar-line"></i> Chưa đặt hạn',
                isUrgentOrOverdue: false
            };
        }

        const formattedDate = formatDateVN(dueDate);
        const today = new Date(getTodayISO() + 'T00:00:00');
        const target = new Date(dueDate + 'T00:00:00');
        const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24));

        if (status === 'completed') {
            return {
                class: 'deadline-done',
                displayText: `<i class="ri-check-line"></i> Done • ${formattedDate}`,
                isUrgentOrOverdue: false
            };
        }

        if (diffDays < 0) {
            return {
                class: 'deadline-overdue',
                displayText: `<i class="ri-alarm-warning-line"></i> Instant • ${formattedDate}`,
                isUrgentOrOverdue: true
            };
        }
        if (diffDays === 0) {
            return {
                class: 'deadline-urgent',
                displayText: `<i class="ri-time-line"></i> Today • ${formattedDate}`,
                isUrgentOrOverdue: true
            };
        }
        if (diffDays <= 3) {
            return {
                class: 'deadline-soon',
                displayText: `<i class="ri-calendar-event-line"></i> To do • ${formattedDate}`,
                isUrgentOrOverdue: diffDays === 1
            };
        }
        // Còn nhiều thời gian: để trống trạng thái và chỉ tô màu nhạt
        return {
            class: 'deadline-plenty',
            displayText: `<i class="ri-calendar-line"></i> ${formattedDate}`,
            isUrgentOrOverdue: false
        };
    }

    // =========================================================================
    // 4. ĐỒNG BỘ LOẠI CÔNG VIỆC & CHUYỂN ĐỔI CHẾ ĐỘ XEM (LIST / MATRIX)
    // =========================================================================
    function applyViewMode() {
        if (currentViewMode === 'matrix') {
            if (listViewContainer) listViewContainer.style.display = 'none';
            if (matrixViewContainer) matrixViewContainer.style.display = 'grid';
            if (btnViewMatrix) btnViewMatrix.classList.add('active');
            if (btnViewList) btnViewList.classList.remove('active');
        } else {
            if (listViewContainer) listViewContainer.style.display = 'block';
            if (matrixViewContainer) matrixViewContainer.style.display = 'none';
            if (btnViewList) btnViewList.classList.add('active');
            if (btnViewMatrix) btnViewMatrix.classList.remove('active');
        }
    }

    if (btnViewList) btnViewList.addEventListener('click', () => {
        currentViewMode = 'list';
        saveViewModeToStorage();
        applyViewMode();
    });

    if (btnViewMatrix) btnViewMatrix.addEventListener('click', () => {
        currentViewMode = 'matrix';
        saveViewModeToStorage();
        applyViewMode();
    });

    function populateCategoryDropdowns() {
        if (categoryInput) {
            const currentFormVal = categoryInput.value;
            categoryInput.innerHTML = '<option value="">Loại việc</option>';
            categories.forEach(cat => {
                categoryInput.innerHTML += '<option value="' + escapeHTML(cat.id) + '">' + escapeHTML(cat.icon) + ' ' + escapeHTML(cat.name) + '</option>';
            });
            if (categories.some(c => String(c.id) === String(currentFormVal))) {
                categoryInput.value = currentFormVal;
            }
        }

        if (modalCategoryInput) {
            modalCategoryInput.innerHTML = '';
            categories.forEach(cat => {
                modalCategoryInput.innerHTML += '<option value="' + escapeHTML(cat.id) + '">' + escapeHTML(cat.icon) + ' ' + escapeHTML(cat.name) + '</option>';
            });
        }

        if (filterCategorySelect) {
            const currentFilterVal = filterCategorySelect.value;
            filterCategorySelect.innerHTML = '<option value="all">📁 Tất cả loại việc</option>';
            categories.forEach(cat => {
                filterCategorySelect.innerHTML += '<option value="' + escapeHTML(cat.id) + '">' + escapeHTML(cat.icon) + ' ' + escapeHTML(cat.name) + '</option>';
            });
            filterCategorySelect.innerHTML += '<option value="none">📂 Chưa phân loại</option>';

            if (currentFilterVal === 'all' || currentFilterVal === 'none' || categories.some(c => String(c.id) === String(currentFilterVal))) {
                filterCategorySelect.value = currentFilterVal;
            } else {
                currentCategoryFilter = 'all';
                filterCategorySelect.value = 'all';
            }
        }
    }

    function renderCategoryManagerList() {
        categoryManagerListEl.innerHTML = '';
        if (categories.length === 0) {
            categoryManagerListEl.innerHTML = `
                <li style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.85rem;">
                    Chưa có loại công việc nào. Hãy thêm mới ở khung phía trên!
                </li>
            `;
            return;
        }

        categories.forEach(cat => {
            const count = tasks.filter(t => String(t.categoryId) === String(cat.id)).length;
            const badgeStyle = getCategoryBadgeStyle(cat.color);

            const li = document.createElement('li');
            li.className = 'cat-manager-item';
            li.dataset.id = cat.id;

            li.innerHTML = `
                <div class="cat-manager-left">
                    <span class="cat-color-dot" style="background-color: ${escapeHTML(cat.color)};"></span>
                    <span class="badge-category" style="${badgeStyle}; cursor: default;">
                        <span>${escapeHTML(cat.icon)}</span>
                        <span>${escapeHTML(cat.name)}</span>
                    </span>
                    <span class="cat-task-count">(${count} công việc)</span>
                </div>
                <div class="task-actions">
                    <button type="button" class="btn-icon btn-edit-cat" title="Sửa loại việc này">
                        <i class="ri-pencil-line"></i><span>Sửa</span>
                    </button>
                    <button type="button" class="btn-icon btn-delete btn-delete-cat" title="Xóa loại việc này">
                        <i class="ri-delete-bin-line"></i><span>Xóa</span>
                    </button>
                </div>
            `;
            categoryManagerListEl.appendChild(li);
        });
    }

    // =========================================================================
    // 5. DASHBOARD MINI, BỘ LỌC THÔNG MINH & HIỂN THỊ CÔNG VIỆC
    // =========================================================================
    function updateDashboardStats() {
        const allTasks = tasks;
        const total = allTasks.length;
        const completed = allTasks.filter(task => task.status === 'completed').length;
        const pending = total - completed;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        const urgentOrOverdueCount = allTasks.filter(task => {
            if (task.status === 'completed') return false;
            const deadlineInfo = getDeadlineAndTermInfo(task.dueDate, task.status);
            if (deadlineInfo && deadlineInfo.isUrgentOrOverdue) return true;
            return task.quadrant === 'q1' && task.priority === 'high';
        }).length;

        if (statTotalEl) statTotalEl.textContent = String(total).padStart(2, '0');
        if (statCompletedEl) statCompletedEl.textContent = String(completed).padStart(2, '0');
        if (statPendingEl) statPendingEl.textContent = String(pending).padStart(2, '0');
        if (statUrgentEl) statUrgentEl.textContent = String(urgentOrOverdueCount).padStart(2, '0');

        if (statProgressTextEl) statProgressTextEl.textContent = `${percent}%`;
        if (statProgressBarEl) statProgressBarEl.style.width = `${percent}%`;
    }

    function getFilteredTasks() {
        const keyword = (currentSearchQuery || '').trim();
        const normalizedKeyword = removeVietnameseTones(keyword);

        return tasks.filter(task => {
            // 1. Tìm kiếm theo từ khóa thông minh (Title, Subtasks, Tên Loại việc)
            let matchSearch = true;
            if (keyword) {
                const titleNorm = removeVietnameseTones(task.title || '');
                const cat = getCategoryById(task.categoryId);
                const catNameNorm = removeVietnameseTones(cat && cat.name ? cat.name : '');
                const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
                const matchSub = subtasks.some(s => removeVietnameseTones(s.title || '').includes(normalizedKeyword));

                matchSearch = titleNorm.includes(normalizedKeyword) || catNameNorm.includes(normalizedKeyword) || matchSub;
            }

            // 2. Lọc theo trạng thái
            let matchStatus = true;
            if (currentStatusFilter === 'pending') {
                matchStatus = task.status !== 'completed' && task.status !== 'in-progress';
            } else if (currentStatusFilter === 'in-progress') {
                matchStatus = task.status === 'in-progress';
            } else if (currentStatusFilter === 'completed') {
                matchStatus = task.status === 'completed';
            }

            // 3. Lọc theo Loại việc
            let matchCategory = true;
            if (currentCategoryFilter === 'none') {
                matchCategory = !task.categoryId || task.categoryId === 'none';
            } else if (currentCategoryFilter !== 'all') {
                matchCategory = String(task.categoryId) === String(currentCategoryFilter);
            }

            // 4. Lọc theo Mức độ ưu tiên
            let matchPriority = true;
            if (currentPriorityFilter !== 'all') {
                matchPriority = task.priority === currentPriorityFilter;
            }

            // 5. Lọc theo Thời hạn hoàn thành
            let matchDueDate = true;
            if (currentDueDateFilter !== 'all') {
                if (!task.dueDate) {
                    matchDueDate = currentDueDateFilter === 'no_date';
                } else if (currentDueDateFilter === 'no_date') {
                    matchDueDate = false;
                } else {
                    const today = new Date(getTodayISO() + 'T00:00:00');
                    const target = new Date(task.dueDate + 'T00:00:00');
                    const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24));

                    if (currentDueDateFilter === 'overdue') {
                        matchDueDate = diffDays < 0 && task.status !== 'completed';
                    } else if (currentDueDateFilter === 'today') {
                        matchDueDate = diffDays === 0;
                    } else if (currentDueDateFilter === 'this_week') {
                        matchDueDate = diffDays >= 0 && diffDays <= 7;
                    } else if (currentDueDateFilter === 'future') {
                        matchDueDate = diffDays > 7;
                    }
                }
            }

            return matchSearch && matchStatus && matchCategory && matchPriority && matchDueDate;
        });
    }

    function updateActiveFiltersBadge() {
        let count = 0;
        if (currentSearchQuery && currentSearchQuery.trim() !== '') count++;
        if (currentCategoryFilter && currentCategoryFilter !== 'all') count++;
        if (currentPriorityFilter && currentPriorityFilter !== 'all') count++;
        if (currentDueDateFilter && currentDueDateFilter !== 'all') count++;
        if (currentStatusFilter && currentStatusFilter !== 'all') count++;

        if (activeFiltersBadge) {
            if (count > 0) {
                activeFiltersBadge.textContent = count;
                activeFiltersBadge.style.display = 'inline-flex';
            } else {
                activeFiltersBadge.style.display = 'none';
            }
        }

        if (btnToggleFilterDropdown) {
            btnToggleFilterDropdown.classList.toggle('has-active-filter', count > 0);
        }

        renderActiveFilterChips();
    }

    function renderActiveFilterChips() {
        if (!activeFilterChipsContainer || !activeFilterChipsList) return;

        const chips = [];

        // 1. Chip từ khóa
        if (currentSearchQuery && currentSearchQuery.trim() !== '') {
            chips.push({
                type: 'search',
                label: `Từ khóa: "${currentSearchQuery.trim()}"`,
                icon: 'ri-search-line',
                onRemove: () => {
                    currentSearchQuery = '';
                    if (searchTaskInput) searchTaskInput.value = '';
                }
            });
        }

        // 2. Chip Loại việc
        if (currentCategoryFilter && currentCategoryFilter !== 'all') {
            let catLabel = 'Loại việc';
            if (currentCategoryFilter === 'none') {
                catLabel = 'Chưa phân loại';
            } else {
                const cat = getCategoryById(currentCategoryFilter);
                catLabel = `${cat.icon || '📁'} ${cat.name || 'Loại việc'}`;
            }
            chips.push({
                type: 'category',
                label: `Loại việc: ${catLabel}`,
                icon: 'ri-price-tag-3-line',
                onRemove: () => {
                    currentCategoryFilter = 'all';
                    if (filterCategorySelect) filterCategorySelect.value = 'all';
                }
            });
        }

        // 3. Chip Mức ưu tiên
        if (currentPriorityFilter && currentPriorityFilter !== 'all') {
            const priorityMap = {
                high: 'Ưu tiên cao',
                medium: 'Trung bình',
                low: 'Ưu tiên thấp'
            };
            chips.push({
                type: 'priority',
                priorityClass: currentPriorityFilter,
                label: `Ưu tiên: ${priorityMap[currentPriorityFilter] || currentPriorityFilter}`,
                icon: 'ri-flag-line',
                onRemove: () => {
                    currentPriorityFilter = 'all';
                    if (filterPrioritySelect) filterPrioritySelect.value = 'all';
                }
            });
        }

        // 4. Chip Thời hạn
        if (currentDueDateFilter && currentDueDateFilter !== 'all') {
            const dueMap = {
                overdue: '🚨 Quá hạn',
                today: '⏰ Hôm nay',
                this_week: '📅 Trong tuần này',
                future: '⏳ Còn nhiều thời gian',
                no_date: '⚪ Chưa đặt hạn'
            };
            chips.push({
                type: 'dueDate',
                label: `Hạn: ${dueMap[currentDueDateFilter] || currentDueDateFilter}`,
                icon: 'ri-calendar-line',
                onRemove: () => {
                    currentDueDateFilter = 'all';
                    if (filterDueDateSelect) filterDueDateSelect.value = 'all';
                }
            });
        }

        // 5. Chip Trạng thái
        if (currentStatusFilter && currentStatusFilter !== 'all') {
            const statusMap = {
                pending: '⏳ Cần làm',
                'in-progress': '⚡ Đang làm',
                completed: '✅ Đã xong'
            };
            chips.push({
                type: 'status',
                label: `Trạng thái: ${statusMap[currentStatusFilter] || currentStatusFilter}`,
                icon: 'ri-checkbox-circle-line',
                onRemove: () => {
                    currentStatusFilter = 'all';
                    if (filterStatusSelect) filterStatusSelect.value = 'all';
                    if (filterBtns) {
                        filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === 'all'));
                    }
                }
            });
        }

        if (chips.length === 0) {
            activeFilterChipsContainer.style.display = 'none';
            activeFilterChipsList.innerHTML = '';
            return;
        }

        activeFilterChipsContainer.style.display = 'flex';
        activeFilterChipsList.innerHTML = '';

        chips.forEach(chip => {
            const chipEl = document.createElement('div');
            chipEl.className = `filter-chip ${chip.priorityClass ? 'chip-priority-' + chip.priorityClass : ''}`;
            chipEl.innerHTML = `
                <i class="${chip.icon}"></i>
                <span>${escapeHTML(chip.label)}</span>
                <button type="button" class="btn-remove-chip" title="Bỏ tiêu chí lọc này" aria-label="Bỏ tiêu chí ${escapeHTML(chip.label)}">
                    <i class="ri-close-line"></i>
                </button>
            `;
            chipEl.querySelector('.btn-remove-chip')?.addEventListener('click', (e) => {
                e.stopPropagation();
                chip.onRemove();
                updateActiveFiltersBadge();
                renderTasks();
            });
            activeFilterChipsList.appendChild(chipEl);
        });
    }

    function resetAllFilters() {
        currentSearchQuery = '';
        currentStatusFilter = 'all';
        currentCategoryFilter = 'all';
        currentPriorityFilter = 'all';
        currentDueDateFilter = 'all';

        if (searchTaskInput) searchTaskInput.value = '';
        if (filterCategorySelect) filterCategorySelect.value = 'all';
        if (filterPrioritySelect) filterPrioritySelect.value = 'all';
        if (filterDueDateSelect) filterDueDateSelect.value = 'all';
        if (filterStatusSelect) filterStatusSelect.value = 'all';

        if (filterBtns && filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === 'all');
            });
        }

        updateActiveFiltersBadge();
        renderTasks();
    }

    // Expose resetAllFilters to window so empty state button can call it
    window.__resetAllAppFilters = resetAllFilters;

    function createTaskElement(task) {
        const isCompleted = task.status === 'completed';
        const priorityInfo = getPriorityConfig(task.priority);
        const categoryInfo = getCategoryById(task.categoryId);
        const categoryStyle = getCategoryBadgeStyle(categoryInfo.color);
        const quadrantInfo = getQuadrantConfig(task.quadrant);
        const deadlineInfo = getDeadlineAndTermInfo(task.dueDate, task.status);

        const li = document.createElement('li');
        li.className = `task-item ${isCompleted ? 'is-completed' : ''}`;
        li.dataset.id = String(task.id);
        li.dataset.priority = task.priority;
        li.dataset.quadrant = task.quadrant || 'q2';
        li.setAttribute('draggable', 'true');

        li.innerHTML = `
            <div class="task-left">
                <label class="checkbox-container" title="Đánh dấu hoàn thành / cần làm">
                    <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <div class="task-content">
                    <span class="task-name" title="Nhấp đúp chuột để sửa tên công việc">${escapeHTML(task.title)}</span>
                    <div class="task-meta">
                        ${task.actualTime > 0 ? `
                            <span class="badge-time-spent" title="Tổng thời gian đã tập trung cho công việc này">
                                <i class="ri-timer-flash-line"></i> ${task.actualTime} phút
                            </span>
                        ` : ''}

                        <span class="badge-category category-editable" style="${categoryStyle}" title="Nhấp để đổi loại việc">
                            <span>${escapeHTML(categoryInfo.icon)}</span>
                            <span>${escapeHTML(categoryInfo.name)}</span>
                        </span>

                        ${task.recurring === 'daily' ? `
                            <span class="badge badge-recurring" title="Công việc lặp lại hằng ngày">🔁 Hằng ngày</span>
                        ` : ''}
                        ${task.recurring === 'weekly' ? `
                            <span class="badge badge-recurring" title="Công việc lặp lại hằng tuần">📅 Hằng tuần</span>
                        ` : ''}

                        <span class="badge-quadrant ${quadrantInfo.class} quadrant-editable" title="Nhấp để chuyển sang góc ma trận khác">
                            <span>${quadrantInfo.dot}</span>
                            <span>${quadrantInfo.shortLabel}</span>
                        </span>

                        <span class="badge ${priorityInfo.class} badge-editable" title="Nhấp để đổi mức độ ưu tiên">
                            <i class="${priorityInfo.icon}"></i> ${priorityInfo.label}
                        </span>

                        <span class="badge-deadline date-editable ${deadlineInfo ? deadlineInfo.class : 'badge-none'}" title="Nhấp để đổi ngày đến hạn">
                            ${deadlineInfo ? deadlineInfo.displayText : '<i class="ri-calendar-line"></i> Chưa đặt hạn'}
                        </span>

                        ${(() => {
                            const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
                            const totalSub = subtasks.length;
                            const doneSub = subtasks.filter(s => s.completed).length;
                            if (totalSub > 0) {
                                return `
                                    <button type="button" class="badge-subtasks-toggle ${doneSub === totalSub ? 'has-completed' : ''}" title="Bấm để xem/quản lý việc con">
                                        <i class="ri-checkbox-multiple-line"></i> ☑️ ${doneSub}/${totalSub}
                                    </button>
                                `;
                            } else {
                                return `
                                    <button type="button" class="btn-subtask-add-quick" title="Thêm việc con cho công việc này">
                                        <i class="ri-node-tree"></i> + Việc con
                                    </button>
                                `;
                            }
                        })()}

                        <span class="task-date" style="font-weight: 500;">
                            <i class="ri-loader-4-line"></i> ${getStatusLabel(task.status)}
                        </span>
                    </div>

                    ${(() => {
                        const isExpanded = expandedSubtaskTaskIds.has(String(task.id));
                        if (!isExpanded) return '';

                        const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
                        const totalSub = subtasks.length;
                        const doneSub = subtasks.filter(s => s.completed).length;
                        const percent = totalSub > 0 ? Math.round((doneSub / totalSub) * 100) : 0;

                        return `
                            <div class="task-subtasks-container">
                                <div class="subtasks-header">
                                    <span class="subtasks-title">Danh sách việc con (${doneSub}/${totalSub})</span>
                                    <div class="subtasks-progress-mini">
                                        <div class="subtasks-progress-fill" style="width: ${percent}%;"></div>
                                    </div>
                                </div>
                                <ul class="subtasks-list">
                                    ${subtasks.map(s => `
                                        <li class="subtask-item ${s.completed ? 'is-completed' : ''}" data-subtask-id="${escapeHTML(s.id)}">
                                            <label class="subtask-checkbox-label">
                                                <input type="checkbox" class="subtask-item-checkbox" ${s.completed ? 'checked' : ''}>
                                                <span class="subtask-text">${escapeHTML(s.title)}</span>
                                            </label>
                                            <button type="button" class="btn-delete-subtask" title="Xóa việc con này">
                                                <i class="ri-close-line"></i>
                                            </button>
                                        </li>
                                    `).join('')}
                                </ul>
                                <form class="subtask-add-form" novalidate>
                                    <input type="text" class="subtask-input" placeholder="Thêm việc con mới..." required>
                                    <button type="submit" class="btn-add-subtask-submit" title="Thêm việc con"><i class="ri-add-line"></i></button>
                                </form>
                            </div>
                        `;
                    })()}
                </div>
            </div>
            <div class="task-actions">
                ${!isCompleted ? `
                    <button type="button" class="btn-icon btn-progress" title="Chuyển trạng thái: Cần làm / Đang thực hiện">
                        <i class="${task.status === 'in-progress' ? 'ri-pause-circle-line' : 'ri-play-circle-line'}"></i>
                        <span class="action-text">${task.status === 'in-progress' ? 'Đang làm' : 'Bắt đầu'}</span>
                    </button>
                ` : ''}
                <button type="button" class="btn-icon btn-delete" title="Xóa công việc">
                    <i class="ri-delete-bin-line"></i>
                    <span class="action-text">Xóa</span>
                </button>
            </div>
        `;

        return li;
    }

    function renderTasks() {
        const filteredTasks = getFilteredTasks();
        const sortedTasks = sortTasks(filteredTasks);

        // 1. Render List View
        taskListEl.innerHTML = '';
        if (sortedTasks.length === 0) {
            taskListEl.innerHTML = `
                <li class="task-empty-state" role="status">
                    <div class="empty-state-card">
                        <div class="empty-icon-wrapper">
                            <i class="ri-search-eye-line"></i>
                        </div>
                        <h3 class="empty-title">Không tìm thấy công việc phù hợp</h3>
                        <p class="empty-desc">Không có công việc nào khớp với các tiêu chí bộ lọc hoặc từ khóa tìm kiếm hiện tại.</p>
                        <button type="button" class="btn btn-primary btn-sm btn-empty-reset" onclick="window.__resetAllAppFilters && window.__resetAllAppFilters()">
                            <i class="ri-refresh-line"></i>
                            <span>Xóa bộ lọc để xem tất cả</span>
                        </button>
                    </div>
                </li>
            `;
        } else {
            const listFragment = document.createDocumentFragment();
            sortedTasks.forEach(task => {
                listFragment.appendChild(createTaskElement(task));
            });
            taskListEl.appendChild(listFragment);
        }

        // 2. Render Matrix View (4 Ô Q1, Q2, Q3, Q4)
        ['q1', 'q2', 'q3', 'q4'].forEach(qKey => {
            const listContainer = matrixLists[qKey];
            const countBadge = matrixCounts[qKey];
            if (!listContainer || !countBadge) return;

            listContainer.innerHTML = '';
            const quadrantTasks = sortedTasks.filter(t => (t.quadrant || 'q2') === qKey);
            countBadge.textContent = quadrantTasks.length;

            if (quadrantTasks.length === 0) {
                listContainer.innerHTML = `
                    <li class="quadrant-empty">
                        <i class="ri-drag-drop-line"></i>
                        <span>Trống — Kéo thả công việc vào đây hoặc nhập ở ô phía trên</span>
                    </li>
                `;
            } else {
                const quadFragment = document.createDocumentFragment();
                quadrantTasks.forEach(task => {
                    quadFragment.appendChild(createTaskElement(task));
                });
                listContainer.appendChild(quadFragment);
            }
        });

        updateDashboardStats();
        evaluateCelebrationStates();
    }

    // =========================================================================
    // 6. BỘ 5 CHỨC NĂNG CHỈNH SỬA TRỰC TIẾP TRÊN THẺ (INLINE EDITING)
    // =========================================================================
    function enableInlineTitleEdit(taskItem) {
        const existingInput = taskItem.querySelector('.inline-edit-input');
        if (existingInput) {
            existingInput.focus();
            return;
        }

        const targetId = String(taskItem.dataset.id);
        const taskObj = tasks.find(t => String(t.id) === targetId);
        const taskNameEl = taskItem.querySelector('.task-name');
        if (!taskObj || !taskNameEl) return;

        taskItem.classList.add('is-editing');
        taskItem.setAttribute('draggable', 'false');

        const inputEl = document.createElement('input');
        inputEl.type = 'text';
        inputEl.className = 'inline-edit-input';
        inputEl.value = taskObj.title;

        taskNameEl.replaceWith(inputEl);
        inputEl.focus();
        inputEl.select();

        let isHandled = false;
        const saveChanges = () => {
            if (isHandled) return;
            isHandled = true;
            const newTitle = inputEl.value.trim();
            if (newTitle && newTitle !== taskObj.title) {
                tasks = tasks.map(t => (String(t.id) === targetId ? { ...t, title: newTitle } : t));
                saveTasksToStorage();
            }
            renderTasks();
            syncTimeModuleUI();
        };
        const cancelChanges = () => {
            if (isHandled) return;
            isHandled = true;
            renderTasks();
        };

        if (inputEl) inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); saveChanges(); }
            else if (e.key === 'Escape') { e.preventDefault(); cancelChanges(); }
        });
        if (inputEl) inputEl.addEventListener('blur', saveChanges);
    }

    function enableInlineCategoryEdit(taskItem, catBadgeEl) {
        const targetId = String(taskItem.dataset.id);
        const taskObj = tasks.find(t => String(t.id) === targetId);
        if (!taskObj) return;

        const selectEl = document.createElement('select');
        selectEl.className = 'inline-edit-select';

        categories.forEach(cat => {
            const optionEl = document.createElement('option');
            optionEl.value = cat.id;
            optionEl.textContent = `${cat.icon} ${cat.name}`;
            if (String(cat.id) === String(taskObj.categoryId)) optionEl.selected = true;
            selectEl.appendChild(optionEl);
        });

        if (taskObj.categoryId === 'none' || !categories.some(c => String(c.id) === String(taskObj.categoryId))) {
            const noneOpt = document.createElement('option');
            noneOpt.value = 'none';
            noneOpt.textContent = '📁 Chưa phân loại';
            noneOpt.selected = true;
            selectEl.prepend(noneOpt);
        }

        catBadgeEl.replaceWith(selectEl);
        selectEl.focus();

        let isHandled = false;
        const saveCategory = () => {
            if (isHandled) return;
            isHandled = true;
            const newCatId = selectEl.value;
            if (newCatId && String(newCatId) !== String(taskObj.categoryId)) {
                tasks = tasks.map(t => (String(t.id) === targetId ? { ...t, categoryId: newCatId } : t));
                saveTasksToStorage();
            }
            renderTasks();
            syncTimeModuleUI();
        };
        const cancelCategory = () => {
            if (isHandled) return;
            isHandled = true;
            renderTasks();
        };

        if (selectEl) selectEl.addEventListener('change', saveCategory);
        if (selectEl) selectEl.addEventListener('blur', saveCategory);
        if (selectEl) selectEl.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { e.preventDefault(); cancelCategory(); }
            else if (e.key === 'Enter') { e.preventDefault(); saveCategory(); }
        });
    }

    function enableInlineQuadrantEdit(taskItem, quadBadgeEl) {
        const targetId = String(taskItem.dataset.id);
        const taskObj = tasks.find(t => String(t.id) === targetId);
        if (!taskObj) return;

        const selectEl = document.createElement('select');
        selectEl.className = 'inline-edit-select';
        selectEl.setAttribute('aria-label', 'Chọn góc ma trận Eisenhower');

        const options = [
            { value: 'q1', text: '🔴 Ô 1: Làm ngay' },
            { value: 'q2', text: '🔵 Ô 2: Lên kế hoạch' },
            { value: 'q3', text: '🟡 Ô 3: Ủy quyền' },
            { value: 'q4', text: '⚪ Ô 4: Tối thiểu' }
        ];

        options.forEach(opt => {
            const optionEl = document.createElement('option');
            optionEl.value = opt.value;
            optionEl.textContent = opt.text;
            if (opt.value === (taskObj.quadrant || 'q2')) optionEl.selected = true;
            selectEl.appendChild(optionEl);
        });

        quadBadgeEl.replaceWith(selectEl);
        selectEl.focus();

        let isHandled = false;
        const saveQuadrant = () => {
            if (isHandled) return;
            isHandled = true;
            const newQuad = selectEl.value;
            if (newQuad && newQuad !== taskObj.quadrant) {
                tasks = tasks.map(t => (String(t.id) === targetId ? { ...t, quadrant: newQuad } : t));
                saveTasksToStorage();
            }
            renderTasks();
            syncTimeModuleUI();
        };
        const cancelQuadrant = () => {
            if (isHandled) return;
            isHandled = true;
            renderTasks();
        };

        if (selectEl) selectEl.addEventListener('change', saveQuadrant);
        if (selectEl) selectEl.addEventListener('blur', saveQuadrant);
        if (selectEl) selectEl.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { e.preventDefault(); cancelQuadrant(); }
            else if (e.key === 'Enter') { e.preventDefault(); saveQuadrant(); }
        });
    }

    function enableInlinePriorityEdit(taskItem, badgeEl) {
        const targetId = String(taskItem.dataset.id);
        const taskObj = tasks.find(t => String(t.id) === targetId);
        if (!taskObj) return;

        const selectEl = document.createElement('select');
        selectEl.className = 'inline-edit-select';

        const options = [
            { value: 'high', text: '🔥 Cao' },
            { value: 'medium', text: '🚩 Trung bình' },
            { value: 'low', text: '🌿 Thấp' }
        ];

        const currentPriority = taskObj.priority !== 'none' ? taskObj.priority : 'medium';
        options.forEach(opt => {
            const optionEl = document.createElement('option');
            optionEl.value = opt.value;
            optionEl.textContent = opt.text;
            if (opt.value === currentPriority) optionEl.selected = true;
            selectEl.appendChild(optionEl);
        });

        badgeEl.replaceWith(selectEl);
        selectEl.focus();

        let isHandled = false;
        const savePriority = () => {
            if (isHandled) return;
            isHandled = true;
            const newPriority = selectEl.value;
            if (newPriority && newPriority !== taskObj.priority) {
                tasks = tasks.map(t => (String(t.id) === targetId ? { ...t, priority: newPriority } : t));
                saveTasksToStorage();
            }
            renderTasks();
            syncTimeModuleUI();
        };
        const cancelPriority = () => {
            if (isHandled) return;
            isHandled = true;
            renderTasks();
        };

        if (selectEl) selectEl.addEventListener('change', savePriority);
        if (selectEl) selectEl.addEventListener('blur', savePriority);
        if (selectEl) selectEl.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { e.preventDefault(); cancelPriority(); }
            else if (e.key === 'Enter') { e.preventDefault(); savePriority(); }
        });
    }

    function enableInlineDateEdit(taskItem, dateEl) {
        const targetId = String(taskItem.dataset.id);
        const taskObj = tasks.find(t => String(t.id) === targetId);
        if (!taskObj) return;

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.className = 'inline-edit-date';
        dateInput.value = taskObj.dueDate || getTodayISO();

        dateEl.replaceWith(dateInput);
        dateInput.focus();

        try {
            if (typeof dateInput.showPicker === 'function') dateInput.showPicker();
        } catch (err) {}

        let isHandled = false;
        const saveDate = () => {
            if (isHandled) return;
            isHandled = true;
            const newDate = dateInput.value;
            if (newDate !== taskObj.dueDate) {
                tasks = tasks.map(t => (String(t.id) === targetId ? {
                    ...t,
                    dueDate: newDate,
                    scope: calculateTaskScope(newDate)
                } : t));
                saveTasksToStorage();
            }
            renderTasks();
            syncTimeModuleUI();
        };
        const cancelDate = () => {
            if (isHandled) return;
            isHandled = true;
            renderTasks();
        };

        if (dateInput) dateInput.addEventListener('change', saveDate);
        if (dateInput) dateInput.addEventListener('blur', saveDate);
        if (dateInput) dateInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { e.preventDefault(); cancelDate(); }
            else if (e.key === 'Enter') { e.preventDefault(); saveDate(); }
        });
    }

    // =========================================================================
    // 7. HTML5 DRAG & DROP API TRÊN MA TRẬN EISENHOWER 2x2
    // =========================================================================
    if (tasksWorkspace) tasksWorkspace.addEventListener('dragstart', (e) => {
        // Chỉ cho phép kéo thả ở Ma trận Eisenhower (viewMode === 'matrix')
        if (currentViewMode !== 'matrix') {
            e.preventDefault();
            return;
        }
        const taskItem = e.target.closest('.task-item');
        if (!taskItem || !taskItem.dataset.id || taskItem.classList.contains('is-editing')) {
            e.preventDefault();
            return;
        }
        draggedTaskId = String(taskItem.dataset.id);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', draggedTaskId);
        setTimeout(() => {
            taskItem.classList.add('is-dragging');
        }, 0);
    });

    if (tasksWorkspace) tasksWorkspace.addEventListener('dragend', (e) => {
        const taskItem = e.target.closest('.task-item');
        if (taskItem) taskItem.classList.remove('is-dragging');
        quadrantCards.forEach(card => card.classList.remove('drag-over'));
        draggedTaskId = null;
    });

    quadrantCards.forEach(card => {
        if (card) card.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (!card.classList.contains('drag-over')) {
                card.classList.add('drag-over');
            }
        });

        if (card) card.addEventListener('dragenter', (e) => {
            e.preventDefault();
            card.classList.add('drag-over');
        });

        if (card) card.addEventListener('dragleave', (e) => {
            if (!card.contains(e.relatedTarget)) {
                card.classList.remove('drag-over');
            }
        });

        if (card) card.addEventListener('drop', (e) => {
            e.preventDefault();
            card.classList.remove('drag-over');

            const targetQuadrant = card.dataset.quadrant;
            const droppedId = String(e.dataTransfer.getData('text/plain') || draggedTaskId || '');
            if (!targetQuadrant || !droppedId) return;

            const targetTask = tasks.find(t => String(t.id) === droppedId);
            if (targetTask && targetTask.quadrant !== targetQuadrant) {
                tasks = tasks.map(t => (String(t.id) === droppedId ? { ...t, quadrant: targetQuadrant } : t));
                saveTasksToStorage();
                renderTasks();
                syncTimeModuleUI();
            }
        });
    });

    // =========================================================================
    // 8. TRÌNH QUẢN LÝ LOẠI VIỆC (CATEGORY MANAGER)
    // =========================================================================
    function updateCategoryLivePreview() {
        if (!catLivePreview || !catPreviewIcon || !catPreviewName) return;
        const icon = catIconInput.value.trim() || '📁';
        const name = catNameInput.value.trim() || 'Loại việc mới';
        const color = catColorInput.value || '#2563EB';

        catPreviewIcon.textContent = icon;
        catPreviewName.textContent = name;
        catLivePreview.style = getCategoryBadgeStyle(color);
    }

    function resetCategoryForm() {
        editingCategoryId = null;
        categoryForm.reset();
        catIconInput.value = '💼';
        catColorInput.value = '#2563EB';
        catFormModeLabel.textContent = 'Thêm loại việc mới';
        btnSaveCategory.innerHTML = `<i class="ri-add-line"></i><span>Thêm loại việc</span>`;
        btnCancelCatEdit.style.display = 'none';
        updateCategoryLivePreview();
    }

    function openCategoryManager() {
        resetCategoryForm();
        renderCategoryManagerList();
        categoryModal.classList.add('active');
        categoryModal.setAttribute('aria-hidden', 'false');
        catNameInput.focus();
    }

    function closeCategoryManager() {
        categoryModal.classList.remove('active');
        categoryModal.setAttribute('aria-hidden', 'true');
        resetCategoryForm();
    }

    if (btnOpenCatManager) btnOpenCatManager.addEventListener('click', openCategoryManager);
    if (btnCloseCatModal) btnCloseCatModal.addEventListener('click', closeCategoryManager);
    if (btnCancelCatEdit) btnCancelCatEdit.addEventListener('click', resetCategoryForm);
    if (categoryModal) categoryModal.addEventListener('click', (e) => {
        if (e.target === categoryModal) closeCategoryManager();
    });

    if (catIconInput) catIconInput.addEventListener('input', updateCategoryLivePreview);
    if (catNameInput) catNameInput.addEventListener('input', updateCategoryLivePreview);
    if (catColorInput) catColorInput.addEventListener('input', updateCategoryLivePreview);

    if (emojiSuggestions) emojiSuggestions.addEventListener('click', (e) => {
        const emojiBtn = e.target.closest('.emoji-btn');
        if (!emojiBtn) return;
        catIconInput.value = emojiBtn.dataset.emoji;
        updateCategoryLivePreview();
        catNameInput.focus();
    });

    if (categoryForm) categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = catNameInput.value.trim();
        const icon = catIconInput.value.trim() || '📁';
        const color = catColorInput.value || '#2563EB';

        if (!name) {
            alert('Vui lòng nhập tên loại việc!');
            catNameInput.focus();
            return;
        }

        if (editingCategoryId) {
            categories = categories.map(cat => (String(cat.id) === String(editingCategoryId) ? { ...cat, icon, name, color } : cat));
        } else {
            categories.push({ id: generateUniqueId('cat'), name, icon, color });
        }

        saveCategoriesToStorage();
        populateCategoryDropdowns();
        renderCategoryManagerList();
        renderTasks();
        syncTimeModuleUI();
        resetCategoryForm();
    });

    if (categoryManagerListEl) categoryManagerListEl.addEventListener('click', (e) => {
        const itemEl = e.target.closest('.cat-manager-item');
        if (!itemEl) return;
        const catId = String(itemEl.dataset.id);
        const targetCat = categories.find(c => String(c.id) === catId);
        if (!targetCat) return;

        if (e.target.closest('.btn-edit-cat')) {
            editingCategoryId = targetCat.id;
            catIconInput.value = targetCat.icon;
            catNameInput.value = targetCat.name;
            catColorInput.value = targetCat.color;
            catFormModeLabel.textContent = `Đang sửa: ${targetCat.icon} ${targetCat.name}`;
            btnSaveCategory.innerHTML = `<i class="ri-save-line"></i><span>Lưu sửa</span>`;
            btnCancelCatEdit.style.display = 'inline-block';
            updateCategoryLivePreview();
            catNameInput.focus();
            return;
        }

        if (e.target.closest('.btn-delete-cat')) {
            const usedCount = tasks.filter(t => String(t.categoryId) === catId).length;
            const warningMsg = usedCount > 0
                ? `Loại "${targetCat.icon} ${targetCat.name}" đang được gắn cho ${usedCount} công việc.\nNếu xóa, các công việc này sẽ chuyển về "Chưa phân loại". Bạn có chắc chắn muốn xóa?`
                : `Bạn có chắc chắn muốn xóa loại việc "${targetCat.icon} ${targetCat.name}" không?`;

            if (confirm(warningMsg)) {
                categories = categories.filter(c => String(c.id) !== catId);
                tasks = tasks.map(t => (String(t.categoryId) === catId ? { ...t, categoryId: 'none' } : t));
                if (String(editingCategoryId) === catId) resetCategoryForm();

                saveCategoriesToStorage();
                saveTasksToStorage();
                populateCategoryDropdowns();
                renderCategoryManagerList();
                renderTasks();
                syncTimeModuleUI();
            }
        }
    });

    // =========================================================================
    // 9. TỰ ĐỘNG GỢI Ý GÓC MA TRẬN & XỬ LÝ TẠO TASK MỚI (ĐÃ FIX TRIỆT ĐỂ BUG 1 & 2)
    // =========================================================================
    if (quadrantInput) quadrantInput.addEventListener('change', () => {
        isQuadrantManuallySelected = quadrantInput.value !== '';
    });

    function autoUpdateFormQuadrant() {
        if (isQuadrantManuallySelected) return;
        if (!priorityInput.value && !dueDateInput.value) {
            quadrantInput.value = '';
            return;
        }
        quadrantInput.value = suggestEisenhowerQuadrant(priorityInput.value || 'medium', dueDateInput.value);
    }

    if (priorityInput) priorityInput.addEventListener('change', autoUpdateFormQuadrant);
    if (dueDateInput) dueDateInput.addEventListener('change', autoUpdateFormQuadrant);

    function autoUpdateModalQuadrant() {
        modalQuadrantInput.value = suggestEisenhowerQuadrant(modalPriorityInput.value, modalDueDateInput.value);
    }

    if (modalPriorityInput) modalPriorityInput.addEventListener('change', autoUpdateModalQuadrant);
    if (modalDueDateInput) modalDueDateInput.addEventListener('change', autoUpdateModalQuadrant);

    function openUpdateModal(task) {
        pendingModalTaskId = String(task.id);
        modalTaskNameEl.textContent = `"${task.title}"`;

        const defaultCatId = categories.length > 0 ? categories[0].id : 'none';
        modalCategoryInput.value = (task.categoryId && task.categoryId !== 'none') ? task.categoryId : defaultCatId;
        modalPriorityInput.value = (task.priority && task.priority !== 'none') ? task.priority : 'medium';
        modalDueDateInput.value = task.dueDate ? task.dueDate : getTodayISO();
        if (modalRecurringInput) {
            modalRecurringInput.value = task.recurring || 'none';
        }
        modalQuadrantInput.value = task.quadrant || suggestEisenhowerQuadrant(modalPriorityInput.value, modalDueDateInput.value);

        updateModal.classList.add('active');
        updateModal.setAttribute('aria-hidden', 'false');
    }

    function closeUpdateModal() {
        pendingModalTaskId = null;
        updateModal.classList.remove('active');
        updateModal.setAttribute('aria-hidden', 'true');
    }

    if (modalForm) modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!pendingModalTaskId) return;

        const targetId = String(pendingModalTaskId);
        const resolvedDueDate = modalDueDateInput.value;
        const resolvedRecurring = modalRecurringInput ? modalRecurringInput.value : 'none';

        tasks = tasks.map(task => {
            if (String(task.id) === targetId) {
                return {
                    ...task,
                    categoryId: modalCategoryInput.value || 'none',
                    priority: modalPriorityInput.value || 'medium',
                    dueDate: resolvedDueDate,
                    quadrant: modalQuadrantInput.value || suggestEisenhowerQuadrant(modalPriorityInput.value || 'medium', resolvedDueDate),
                    scope: calculateTaskScope(resolvedDueDate),
                    recurring: resolvedRecurring
                };
            }
            return task;
        });

        saveTasksToStorage();
        renderTasks();
        syncTimeModuleUI();
        closeUpdateModal();
    });

    if (btnCloseModal) btnCloseModal.addEventListener('click', closeUpdateModal);
    if (btnSkipModal) btnSkipModal.addEventListener('click', closeUpdateModal);
    if (updateModal) updateModal.addEventListener('click', (e) => {
        if (e.target === updateModal) closeUpdateModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (updateModal.classList.contains('active')) closeUpdateModal();
            if (categoryModal.classList.contains('active')) closeCategoryManager();
        }
    });

    // Bắt sự kiện submit duy nhất trên thẻ <form id="task-form">
    if (taskForm) taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Lấy tên công việc NGAY ĐẦU HÀM trước khi reset form
        const title = titleInput.value.trim();
        if (!title) {
            alert('Vui lòng nhập tên công việc trước khi thêm!');
            titleInput.focus();
            return;
        }

        const rawCategory = categoryInput.value;
        const rawPriority = priorityInput.value;
        const rawDueDate = dueDateInput.value;
        const rawRecurring = recurringInput ? recurringInput.value : 'none';
        const rawQuadrant = quadrantInput.value;
        const resolvedQuadrant = rawQuadrant || suggestEisenhowerQuadrant(rawPriority || 'medium', rawDueDate);

        // Object task mới tạo: đầy đủ scope, recurring, lastResetDate, status: 'pending', actualTime: 0
        const newTask = {
            id: generateUniqueId('task'),
            title: title,
            categoryId: rawCategory || 'none',
            priority: rawPriority || 'none',
            dueDate: rawDueDate || '',
            quadrant: resolvedQuadrant,
            scope: calculateTaskScope(rawDueDate),
            recurring: rawRecurring || 'none',
            lastResetDate: getTodayISO(),
            subtasks: [],
            status: 'pending',
            actualTime: 0
        };

        tasks.unshift(newTask);
        saveTasksToStorage();

        // Reset form sau khi đã lấy đầy đủ dữ liệu
        taskForm.reset();
        isQuadrantManuallySelected = false;

        renderTasks();
        syncTimeModuleUI();

        if (!rawCategory || !rawPriority || !rawDueDate) {
            openUpdateModal(newTask);
        }
    });

    // Thêm nhanh công việc trực tiếp trong từng Ô Ma trận Eisenhower
    quickAddForms.forEach(qForm => {
        if (qForm) qForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputEl = qForm.querySelector('.quadrant-input');
            const title = inputEl ? inputEl.value.trim() : '';
            const targetQuadrant = qForm.dataset.quadrant;

            if (!title) {
                alert('Vui lòng nhập tên công việc!');
                if (inputEl) inputEl.focus();
                return;
            }

            const quadrantDefaults = {
                q1: { priority: 'high', dueDate: getTodayISO() },
                q2: { priority: 'high', dueDate: getOffsetDateISO(5) },
                q3: { priority: 'medium', dueDate: getTodayISO() },
                q4: { priority: 'low', dueDate: getOffsetDateISO(7) }
            };

            const defaults = quadrantDefaults[targetQuadrant] || quadrantDefaults.q2;
            const defaultCatId = currentCategoryFilter !== 'all' && currentCategoryFilter !== 'none'
                ? currentCategoryFilter
                : (categories[0] ? categories[0].id : 'none');

            const newTask = {
                id: generateUniqueId('task'),
                title: title,
                categoryId: defaultCatId,
                priority: defaults.priority,
                dueDate: defaults.dueDate,
                quadrant: targetQuadrant,
                scope: calculateTaskScope(defaults.dueDate),
                recurring: 'none',
                lastResetDate: getTodayISO(),
                subtasks: [],
                status: 'pending',
                actualTime: 0
            };

            tasks.unshift(newTask);
            saveTasksToStorage();
            if (inputEl) inputEl.value = '';

            renderTasks();
            syncTimeModuleUI();
        });
    });

    // =========================================================================
    // 10. ỦY QUYỀN SỰ KIỆN TRÊN DANH SÁCH & BỘ LỌC TÌM KIẾM
    // =========================================================================
    if (tasksWorkspace) tasksWorkspace.addEventListener('dblclick', (e) => {
        const taskNameEl = e.target.closest('.task-name');
        if (taskNameEl) {
            const taskItem = taskNameEl.closest('.task-item');
            if (taskItem && taskItem.dataset.id) enableInlineTitleEdit(taskItem);
        }
    });

    if (tasksWorkspace) tasksWorkspace.addEventListener('click', (e) => {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem || !taskItem.dataset.id) return;
        const targetId = String(taskItem.dataset.id);

        const catBadgeEl = e.target.closest('.category-editable');
        if (catBadgeEl) {
            enableInlineCategoryEdit(taskItem, catBadgeEl);
            return;
        }

        const quadBadgeEl = e.target.closest('.quadrant-editable');
        if (quadBadgeEl) {
            enableInlineQuadrantEdit(taskItem, quadBadgeEl);
            return;
        }

        const prioBadgeEl = e.target.closest('.badge-editable');
        if (prioBadgeEl) {
            enableInlinePriorityEdit(taskItem, prioBadgeEl);
            return;
        }

        const dateEl = e.target.closest('.date-editable');
        if (dateEl) {
            enableInlineDateEdit(taskItem, dateEl);
            return;
        }


        // Toggle mở rộng việc con
        if (e.target.closest('.badge-subtasks-toggle') || e.target.closest('.btn-subtask-add-quick')) {
            if (expandedSubtaskTaskIds.has(targetId)) {
                expandedSubtaskTaskIds.delete(targetId);
            } else {
                expandedSubtaskTaskIds.add(targetId);
            }
            renderTasks();
            return;
        }

        // Toggle hoàn thành subtask
        if (e.target.classList.contains('subtask-item-checkbox')) {
            const subItem = e.target.closest('.subtask-item');
            if (subItem && subItem.dataset.subtaskId) {
                const subId = String(subItem.dataset.subtaskId);
                tasks = tasks.map(t => {
                    if (String(t.id) === targetId) {
                        const updatedSubtasks = (t.subtasks || []).map(s => {
                            if (String(s.id) === subId) {
                                return { ...s, completed: e.target.checked };
                            }
                            return s;
                        });
                        return { ...t, subtasks: updatedSubtasks };
                    }
                    return t;
                });
                saveTasksToStorage();
                renderTasks();
            }
            return;
        }

        // Xóa subtask
        if (e.target.closest('.btn-delete-subtask')) {
            const subItem = e.target.closest('.subtask-item');
            if (subItem && subItem.dataset.subtaskId) {
                const subId = String(subItem.dataset.subtaskId);
                tasks = tasks.map(t => {
                    if (String(t.id) === targetId) {
                        return {
                            ...t,
                            subtasks: (t.subtasks || []).filter(s => String(s.id) !== subId)
                        };
                    }
                    return t;
                });
                saveTasksToStorage();
                renderTasks();
            }
            return;
        }

        if (e.target.classList.contains('task-checkbox')) {
            const isChecked = e.target.checked;
            handleTaskCheckboxToggle(taskItem, targetId, isChecked);
            return;
        }

        if (e.target.closest('.btn-progress')) {
            tasks = tasks.map(t => (
                String(t.id) === targetId
                    ? { ...t, status: t.status === 'in-progress' ? 'pending' : 'in-progress' }
                    : t
            ));
            saveTasksToStorage();
            renderTasks();
            syncTimeModuleUI();
            return;
        }

        if (e.target.closest('.btn-delete')) {
            const taskToDelete = tasks.find(t => String(t.id) === targetId);
            if (taskToDelete && confirm(`Bạn có chắc chắn muốn xóa công việc:\n"${taskToDelete.title}" không?`)) {
                tasks = tasks.filter(t => String(t.id) !== targetId);
                saveTasksToStorage();
                renderTasks();
                syncTimeModuleUI();
            }
        }
    });


    // =========================================================================
    // 10. LẮNG NGHE SỰ KIỆN TÌM KIẾM, BỘ LỌC POPOVER & SẮP XẾP
    // =========================================================================
    function toggleFilterDropdown(forceState) {
        if (!filterDropdownPanel || !btnToggleFilterDropdown) return;
        const isCurrentlyOpen = filterDropdownPanel.style.display === 'block';
        const willOpen = forceState !== undefined ? forceState : !isCurrentlyOpen;
        
        if (willOpen) {
            filterDropdownPanel.style.display = 'block';
            btnToggleFilterDropdown.classList.add('active');
            btnToggleFilterDropdown.setAttribute('aria-expanded', 'true');
        } else {
            filterDropdownPanel.style.display = 'none';
            btnToggleFilterDropdown.classList.remove('active');
            btnToggleFilterDropdown.setAttribute('aria-expanded', 'false');
        }
    }

    if (btnToggleFilterDropdown) {
        btnToggleFilterDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFilterDropdown();
        });
    }

    if (btnCloseFilterPanel) {
        btnCloseFilterPanel.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFilterDropdown(false);
        });
    }

    if (btnApplyFilter) {
        btnApplyFilter.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFilterDropdown(false);
        });
    }

    // Đóng dropdown khi click ra ngoài vùng popover
    document.addEventListener('click', (e) => {
        if (filterPopoverContainer && !filterPopoverContainer.contains(e.target)) {
            toggleFilterDropdown(false);
        }
    });

    // Đóng dropdown khi bấm Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleFilterDropdown(false);
        }
    });

    // Tìm kiếm thời gian thực theo từ khóa
    if (searchTaskInput) {
        const handleSearch = () => {
            currentSearchQuery = searchTaskInput.value || '';
            updateActiveFiltersBadge();
            renderTasks(); 
        };
        if (searchTaskInput) searchTaskInput.addEventListener('input', handleSearch);
        if (searchTaskInput) searchTaskInput.addEventListener('search', handleSearch);
    }

    // Lọc theo Filter Pills (nếu có)
    if (filterBtns && filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            if (btn) btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentStatusFilter = btn.dataset.filter || 'all';
                if (filterStatusSelect) {
                    filterStatusSelect.value = currentStatusFilter;
                }
                updateActiveFiltersBadge();
                renderTasks(); 
            });
        });
    }

    // Lọc theo Danh mục
    if (filterCategorySelect) {
        filterCategorySelect.addEventListener('change', () => {
            currentCategoryFilter = filterCategorySelect.value;
            updateActiveFiltersBadge();
            renderTasks(); 
        });
    }

    // Lọc theo Mức độ ưu tiên
    if (filterPrioritySelect) {
        filterPrioritySelect.addEventListener('change', () => {
            currentPriorityFilter = filterPrioritySelect.value;
            updateActiveFiltersBadge();
            renderTasks(); 
        });
    }

    // Lọc theo Thời hạn
    if (filterDueDateSelect) {
        filterDueDateSelect.addEventListener('change', () => {
            currentDueDateFilter = filterDueDateSelect.value;
            updateActiveFiltersBadge();
            renderTasks(); 
        });
    }

    // Lọc theo Trạng thái
    if (filterStatusSelect) {
        filterStatusSelect.addEventListener('change', () => {
            currentStatusFilter = filterStatusSelect.value;
            updateActiveFiltersBadge();
            renderTasks(); 
        });
    }

    // Nút Xóa bộ lọc (Reset)
    // Nút Xóa tất cả trên thanh Active Filter Chips
    if (btnClearAllFilterChips) {
        btnClearAllFilterChips.addEventListener('click', () => {
            resetAllFilters();
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            resetAllFilters();
        });
    }

    // Lắng nghe sự kiện thay đổi tiêu chí sắp xếp
    if (taskSortSelect) {
        taskSortSelect.addEventListener('change', () => {
            currentSortMode = taskSortSelect.value || 'smart';
            renderTasks(); 
        });
    }

    // =========================================================================
    // 11. HỆ THỐNG ÂM THANH WEB AUDIO API, CONFETTI & VICTORY STATE (ĐÃ FIX BUG 2)
    // =========================================================================
    let isDailyBannerDismissed = false;
    let sharedAudioCtx = null;
    let confettiAnimId = null;

    function getAudioContext() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        if (!sharedAudioCtx) {
            sharedAudioCtx = new AudioContextClass();
        }
        if (sharedAudioCtx.state === 'suspended') {
            sharedAudioCtx.resume();
        }
        return sharedAudioCtx;
    }

    /**
     * Tiếng "Ding" ngắn gọn khi hoàn thành 1 công việc
     */
    /**
     * Tiếng Beep chuông báo Web Audio API (kiểm tra enableSound)
     */
    function playBeepSound() {
        if (!pomoSettings || pomoSettings.enableSound === false) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            // 2 hồi Beep 880Hz rõ ràng
            [0, 0.16].forEach(offset => {
                const osc = ctx.createOscillator();
                const gainNode = ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now + offset);

                gainNode.gain.setValueAtTime(0.0001, now + offset);
                gainNode.gain.linearRampToValueAtTime(0.2, now + offset + 0.02);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.12);

                osc.connect(gainNode);
                gainNode.connect(ctx.destination);

                osc.start(now + offset);
                osc.stop(now + offset + 0.13);

                osc.onended = () => {
                    osc.disconnect();
                    gainNode.disconnect();
                };
            });
        } catch (err) {}
    }

    function playSingleCompleteDing() {
        if (pomoSettings && pomoSettings.enableSound === false) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1318.51, now); // E6

            gainNode.gain.setValueAtTime(0.001, now);
            gainNode.gain.linearRampToValueAtTime(0.18, now + 0.015);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.26);

            osc.onended = () => {
                osc.disconnect();
                gainNode.disconnect();
            };
        } catch (err) {}
    }

    /**
     * Nhạc chiến thắng playVictoryFanfare() (Chuỗi 4 nốt C5 -> E5 -> G5 -> C6)
     */
    function playVictoryFanfare() {
        if (pomoSettings && pomoSettings.enableSound === false) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            const arpeggioNotes = [
                { freq: 523.25, duration: 0.15, wave: 'triangle' }, // C5
                { freq: 659.25, duration: 0.15, wave: 'triangle' }, // E5
                { freq: 783.99, duration: 0.15, wave: 'triangle' }, // G5
                { freq: 1046.50, duration: 0.40, wave: 'triangle' } // C6
            ];

            let startTimeOffset = 0;
            arpeggioNotes.forEach(note => {
                const noteStart = now + startTimeOffset;
                const noteEnd = noteStart + note.duration;

                const osc = ctx.createOscillator();
                const gainNode = ctx.createGain();

                osc.type = note.wave;
                osc.frequency.setValueAtTime(note.freq, noteStart);

                gainNode.gain.setValueAtTime(0.001, noteStart);
                gainNode.gain.linearRampToValueAtTime(0.22, noteStart + 0.02);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

                osc.connect(gainNode);
                gainNode.connect(ctx.destination);

                osc.start(noteStart);
                osc.stop(noteEnd + 0.01);

                osc.onended = () => {
                    osc.disconnect();
                    gainNode.disconnect();
                };

                startTimeOffset += note.duration;
            });
        } catch (err) {}
    }

    /**
     * Pháo hoa giấy HTML5 Canvas thuần
     */
    function fireConfettiBurst(particleCount = 110) {
        if (!confettiCanvas) return;
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

        const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#3B82F6', '#8B5CF6'];
        const particles = Array.from({ length: particleCount }, () => ({
            x: window.innerWidth * (0.2 + Math.random() * 0.6),
            y: window.innerHeight * 0.35,
            vx: (Math.random() - 0.5) * 16,
            vy: -(Math.random() * 12 + 6),
            size: Math.random() * 7 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 12,
            gravity: 0.32,
            drag: 0.985,
            alpha: 1
        }));

        function renderConfettiFrame() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            let activeParticles = 0;

            particles.forEach(p => {
                if (p.alpha <= 0.02) return;
                activeParticles++;

                p.vx *= p.drag;
                p.vy = p.vy * p.drag + p.gravity;
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                if (p.y > confettiCanvas.height * 0.75) {
                    p.alpha -= 0.025;
                }

                ctx.save();
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
                ctx.restore();
            });

            if (activeParticles > 0) {
                confettiAnimId = requestAnimationFrame(renderConfettiFrame);
            } else {
                ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
                confettiAnimId = null;
            }
        }

        confettiAnimId = requestAnimationFrame(renderConfettiFrame);
    }

    /**
     * Kiểm tra Victory State dựa trên MẢNG TỔNG trong LocalStorage
     * Tuyệt đối KHÔNG kiểm tra trên mảng đã lọc getFilteredTasks()
     */
    function evaluateCelebrationStates() {
        const allTasks = loadJSONFromStorage(TASKS_STORAGE_KEY, tasks);
        const totalSystemTasks = Array.isArray(allTasks) ? allTasks : tasks;

        const isAllSystemCompleted = totalSystemTasks.length > 0 && totalSystemTasks.every(t => t.status === 'completed');

        const todayISO = getTodayISO();
        const todayTasks = totalSystemTasks.filter(t => t.dueDate === todayISO);
        const isAllTodayCompleted = todayTasks.length > 0 && todayTasks.every(t => t.status === 'completed');

        if (!isAllTodayCompleted) {
            isDailyBannerDismissed = false;
        }

        if (dailyCelebrationBanner) {
            dailyCelebrationBanner.style.display = (isAllTodayCompleted && !isDailyBannerDismissed) ? 'flex' : 'none';
        }

        if (victoryStateCard) {
            victoryStateCard.style.display = isAllSystemCompleted ? 'flex' : 'none';
        }
    }

    function handleTaskCheckboxToggle(taskItem, targetId, isChecked) {
        const safeTargetId = String(targetId);

        // Nếu người dùng bỏ chọn (Uncheck) -> Gán về status: 'pending'
        if (!isChecked) {
            tasks = tasks.map(t => (String(t.id) === safeTargetId ? { ...t, status: 'pending' } : t));
            saveTasksToStorage();
            renderTasks();
            syncTimeModuleUI();
            return;
        }

        // Khi người dùng tick hoàn thành (Check)
        tasks = tasks.map(t => (String(t.id) === safeTargetId ? { ...t, status: 'completed' } : t));
        saveTasksToStorage();

        // Kiểm tra trên mảng TỔNG trong LocalStorage
        const allTasks = loadJSONFromStorage(TASKS_STORAGE_KEY, tasks);
        const isAllSystemCompleted = Array.isArray(allTasks) && allTasks.length > 0 && allTasks.every(t => t.status === 'completed');

        if (isAllSystemCompleted) {
            playVictoryFanfare();
            fireConfettiBurst(130);
        } else {
            playSingleCompleteDing();
        }

        taskItem.classList.add('just-completed-anim');
        const floatBadge = document.createElement('span');
        floatBadge.className = 'floating-done-badge';
        floatBadge.innerHTML = `<i class="ri-check-double-line"></i> Đã xong 🎉`;
        taskItem.appendChild(floatBadge);

        setTimeout(() => {
            renderTasks();
            syncTimeModuleUI();
        }, 550);
    }

    if (btnCloseDailyBanner) {
        btnCloseDailyBanner.addEventListener('click', () => {
            isDailyBannerDismissed = true;
            if (dailyCelebrationBanner) dailyCelebrationBanner.style.display = 'none';
        });
    }

    if (btnVictoryAddNew) {
        btnVictoryAddNew.addEventListener('click', () => {
            titleInput.focus();
            titleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    if (btnVictoryReload) {
        btnVictoryReload.addEventListener('click', () => {
            if (confirm('Bạn có muốn đặt lại trạng thái toàn bộ công việc hiện tại về "Cần làm" để bắt đầu chu kỳ mới không?')) {
                tasks = tasks.map(t => ({ ...t, status: 'pending' }));
                saveTasksToStorage();
                renderTasks();
                syncTimeModuleUI();
            }
        });
    }

    // =========================================================================
    // 12. MODULE 2: QUẢN LÝ THỜI GIAN (POMODORO, TAB TITLE & DAILY STATS)
    // =========================================================================
    const POMO_MODES = {
        'focus': { minutes: 25, label: 'Tập trung cao độ' },
        'short-break': { minutes: 5, label: 'Nghỉ giải lao ngắn' },
        'long-break': { minutes: 15, label: 'Nghỉ giải lao dài' }
    };
    const RING_CIRCUMFERENCE = 2 * Math.PI * 116;

    let selectedFocusTaskId = '';
    let currentPomoMode = 'focus';
    let totalModeSeconds = POMO_MODES['focus'].minutes * 60;
    let remainingSeconds = totalModeSeconds;
    let unloggedFocusSeconds = 0;
    let pomoIntervalId = null;
    let isTimerRunning = false;

    // 12.1. Chuyển đổi mượt giữa các Module (Single Page Navigation)
    function switchModule(targetModule) {
        // Ẩn tất cả các module view trước
        if (moduleTasksView) moduleTasksView.style.display = 'none';
        if (moduleTimeView) moduleTimeView.style.display = 'none';
        if (moduleHabitsView) moduleHabitsView.style.display = 'none';
        if (moduleNotesView) moduleNotesView.style.display = 'none';

        // Bỏ active tất cả nav buttons
        if (navBtnTasks) navBtnTasks.classList.remove('active');
        if (navBtnTime) navBtnTime.classList.remove('active');
        if (navBtnHabits) navBtnHabits.classList.remove('active');
        if (navBtnNotes) navBtnNotes.classList.remove('active');

        if (targetModule === 'time') {
            if (moduleTimeView) moduleTimeView.style.display = 'block';
            if (navBtnTime) navBtnTime.classList.add('active');
            if (btnOpenCatManager) btnOpenCatManager.style.display = 'none';

            headerModuleBadge.innerHTML = `<i class="ri-timer-flash-fill"></i><span>Module 02</span>`;
            headerModuleTitle.textContent = 'Quản lý thời gian';
            headerModuleSlogan.textContent = 'Làm việc sâu với phương pháp Pomodoro, đo lường chính xác thời gian thực tế.';

            syncTimeModuleUI();
        } else if (targetModule === 'habits') {
            if (moduleHabitsView) moduleHabitsView.style.display = 'block';
            if (navBtnHabits) navBtnHabits.classList.add('active');
            if (btnOpenCatManager) btnOpenCatManager.style.display = 'none';

            headerModuleBadge.innerHTML = `<i class="ri-plant-fill"></i><span>Module 03</span>`;
            headerModuleTitle.textContent = 'Xây dựng thói quen';
            headerModuleSlogan.textContent = 'Duy trì kỷ luật mỗi ngày để tạo nên sự thay đổi vượt bậc.';

            renderHabits();
            updateHabitStats();
        } else if (targetModule === 'notes') {
            if (moduleNotesView) moduleNotesView.style.display = 'block';
            if (navBtnNotes) navBtnNotes.classList.add('active');
            if (btnOpenCatManager) btnOpenCatManager.style.display = 'none';

            headerModuleBadge.innerHTML = `<i class="ri-file-text-fill"></i><span>Module 04</span>`;
            headerModuleTitle.textContent = 'Sổ tay & Ghi chú nhanh';
            headerModuleSlogan.textContent = 'Ghi lại ý tưởng tức thì, lưu trữ kiến thức và suy nghĩ sáng tạo.';

            renderNotes();
            renderNoteTags();
        } else {
            // Mặc định: tasks
            if (moduleTasksView) moduleTasksView.style.display = 'block';
            if (navBtnTasks) navBtnTasks.classList.add('active');
            if (btnOpenCatManager) btnOpenCatManager.style.display = '';

            headerModuleBadge.innerHTML = `<i class="ri-checkbox-multiple-fill"></i><span>Module 01</span>`;
            headerModuleTitle.textContent = 'Quản lý công việc';
            headerModuleSlogan.textContent = 'Tập trung vào điều quan trọng, hoàn thành từng mục tiêu nhỏ mỗi ngày.';

            renderTasks();
        }


    }

    if (navBtnTasks) navBtnTasks.addEventListener('click', () => switchModule('tasks'));
    if (navBtnTime) navBtnTime.addEventListener('click', () => switchModule('time'));
    if (navBtnHabits) navBtnHabits.addEventListener('click', () => switchModule('habits'));
    if (navBtnNotes) navBtnNotes.addEventListener('click', () => switchModule('notes'));

    // 12.2. Đồng bộ Tiêu đề Tab trình duyệt (Browser Tab Title)
    function formatTimerMMSS(totalSec) {
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function updateBrowserTabTitle() {
        if (isTimerRunning) {
            const timeStr = formatTimerMMSS(remainingSeconds);
            const icon = currentPomoMode === 'focus' ? '⏱️' : '☕';
            document.title = `(${timeStr}) ${icon} Personal Workspace`;
        } else {
            document.title = DEFAULT_DOCUMENT_TITLE;
        }
    }

    function updateTimerDisplay() {
        if (pomoTimeDisplay) {
            pomoTimeDisplay.textContent = formatTimerMMSS(remainingSeconds);
        }
        if (pomoRingProgress && totalModeSeconds > 0) {
            const fraction = remainingSeconds / totalModeSeconds;
            const offset = RING_CIRCUMFERENCE * (1 - fraction);
            pomoRingProgress.style.strokeDashoffset = offset;
        }
        updateBrowserTabTitle();
    }

    // 12.3. Liên kết Công việc & Thống kê Pomodoro trong ngày
    function populateFocusTaskDropdown() {
        if (!focusTaskSelect) return;

        const incompleteTasks = tasks.filter(t => t.status !== 'completed');
        focusTaskSelect.innerHTML = `<option value="">-- Chọn công việc chưa hoàn thành (${incompleteTasks.length} việc) --</option>`;

        incompleteTasks.forEach(task => {
            const cat = getCategoryById(task.categoryId);
            const quad = getQuadrantConfig(task.quadrant);
            const spentText = task.actualTime > 0 ? ` • ⏱️ ${task.actualTime}p` : '';
            const option = document.createElement('option');
            option.value = String(task.id);
            option.textContent = `${quad.dot} [${cat.icon} ${cat.name}] ${task.title}${spentText}`;
            focusTaskSelect.appendChild(option);
        });

        if (selectedFocusTaskId && incompleteTasks.some(t => String(t.id) === String(selectedFocusTaskId))) {
            focusTaskSelect.value = String(selectedFocusTaskId);
        } else {
            selectedFocusTaskId = incompleteTasks.length > 0 ? String(incompleteTasks[0].id) : '';
            focusTaskSelect.value = selectedFocusTaskId;
        }

        updateSelectedFocusTaskMeta();
    }

    function updateSelectedFocusTaskMeta() {
        if (!focusTaskMetaBar) return;
        const task = tasks.find(t => String(t.id) === String(selectedFocusTaskId));

        if (!task || task.status === 'completed') {
            focusTaskMinutesEl.textContent = '0';
            if (btnCompleteFocusedTask) btnCompleteFocusedTask.disabled = true;
            focusTaskMetaBar.style.display = 'none';
            return;
        }

        focusTaskMinutesEl.textContent = task.actualTime || 0;
        if (btnCompleteFocusedTask) btnCompleteFocusedTask.disabled = false;

        const catInfo = getCategoryById(task.categoryId);
        const quadInfo = getQuadrantConfig(task.quadrant);
        const prioInfo = getPriorityConfig(task.priority);

        focusMetaCategory.style = getCategoryBadgeStyle(catInfo.color);
        focusMetaCategory.innerHTML = `<span>${escapeHTML(catInfo.icon)}</span><span>${escapeHTML(catInfo.name)}</span>`;

        focusMetaQuadrant.className = `badge-quadrant ${quadInfo.class}`;
        focusMetaQuadrant.innerHTML = `<span>${quadInfo.dot}</span><span>${quadInfo.shortLabel}</span>`;

        focusMetaPriority.className = `badge ${prioInfo.class}`;
        focusMetaPriority.innerHTML = `<i class="${prioInfo.icon}"></i> ${prioInfo.label}`;

        focusMetaDue.innerHTML = `<i class="ri-calendar-line"></i> Hạn: ${formatDateVN(task.dueDate)}`;
        focusTaskMetaBar.style.display = 'flex';
    }

    function renderTimeTrackingListAndPomoStats() {
        pomoStats = loadPomoStats();
        savePomoStatsToStorage();

        if (pomoCycleCounter) {
            pomoCycleCounter.textContent = `Chu kỳ hôm nay: ${pomoStats.completedCycles}`;
        }
        if (pomoStatTodayCyclesEl) {
            pomoStatTodayCyclesEl.textContent = `${pomoStats.completedCycles} chu kỳ`;
        }
        if (pomoStatTodayMinutesEl) {
            pomoStatTodayMinutesEl.textContent = `${pomoStats.totalFocusMinutes} phút`;
        }

        const totalMinutes = tasks.reduce((sum, t) => sum + (Number(t.actualTime) || 0), 0);
        const trackedCount = tasks.filter(t => (Number(t.actualTime) || 0) > 0).length;

        if (totalActualTimeAllEl) totalActualTimeAllEl.textContent = `${totalMinutes} phút`;
        if (totalTrackedTasksEl) totalTrackedTasksEl.textContent = `${trackedCount} việc`;

        if (!timeTrackedListEl) return;
        const sortedTasks = [...tasks].sort((a, b) => (b.actualTime || 0) - (a.actualTime || 0));

        timeTrackedListEl.innerHTML = '';
        if (sortedTasks.length === 0) {
            timeTrackedListEl.innerHTML = `
                <li style="text-align: center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.85rem;">
                    Chưa có công việc nào trong hệ thống.
                </li>
            `;
            return;
        }

        sortedTasks.forEach(task => {
            const cat = getCategoryById(task.categoryId);
            const isSelected = String(task.id) === String(selectedFocusTaskId);
            const li = document.createElement('li');
            li.className = `time-tracked-item ${isSelected ? 'is-selected' : ''}`;

            li.innerHTML = `
                <div class="time-tracked-info">
                    <span class="time-tracked-title" style="${task.status === 'completed' ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">
                        ${escapeHTML(task.title)}
                    </span>
                    <div class="time-tracked-sub">
                        <span>${escapeHTML(cat.icon)} ${escapeHTML(cat.name)}</span>
                        <span>•</span>
                        <span>${getStatusLabel(task.status)}</span>
                    </div>
                </div>
                <div class="time-tracked-right">
                    <span class="badge-time-spent">
                        <i class="ri-timer-flash-line"></i> ${task.actualTime || 0} phút
                    </span>
                    ${task.status !== 'completed' ? `
                        <button type="button" class="btn-quick-focus" data-id="${escapeHTML(String(task.id))}" title="Chọn công việc này để bấm giờ">
                            <i class="ri-focus-2-line"></i> Chọn
                        </button>
                    ` : ''}
                </div>
            `;
            timeTrackedListEl.appendChild(li);
        });
    }

    function syncTimeModuleUI() {
        populateFocusTaskDropdown();
        renderTimeTrackingListAndPomoStats();
    }

    /**
     * Cộng dồn số phút tập trung vào thuộc tính actualTime của Task đang chọn
     * và cập nhật thống kê Pomodoro trong ngày (personal_workspace_pomo_stats_v1)
     */
    function commitElapsedFocusTime(isFullCycleCompleted = false) {
        if (currentPomoMode !== 'focus') {
            unloggedFocusSeconds = 0;
            return;
        }

        pomoStats = loadPomoStats();
        let addedMinutes = 0;

        if (isFullCycleCompleted) {
            addedMinutes = Math.max(1, Math.round(unloggedFocusSeconds / 60));
            pomoStats.completedCycles += 1;
            pomoStats.totalFocusMinutes += addedMinutes;
            savePomoStatsToStorage();

            if (selectedFocusTaskId) {
                const targetId = String(selectedFocusTaskId);
                tasks = tasks.map(t => {
                    if (String(t.id) === targetId) {
                        const updatedMinutes = (Number(t.actualTime) || 0) + addedMinutes;
                        return {
                            ...t,
                            status: t.status === 'pending' ? 'in-progress' : t.status,
                            actualTime: updatedMinutes,
                            _accumulatedSeconds: updatedMinutes * 60
                        };
                    }
                    return t;
                });
                saveTasksToStorage();
            }
            unloggedFocusSeconds = 0;
        } else if (unloggedFocusSeconds > 0) {
            if (selectedFocusTaskId) {
                const targetId = String(selectedFocusTaskId);
                const targetTask = tasks.find(t => String(t.id) === targetId);
                if (targetTask) {
                    const prevMinutes = Number(targetTask.actualTime) || 0;
                    const prevSeconds = typeof targetTask._accumulatedSeconds === 'number'
                        ? targetTask._accumulatedSeconds
                        : prevMinutes * 60;
                    const newTotalSeconds = prevSeconds + unloggedFocusSeconds;
                    const newActualMinutes = Math.max(1, Math.round(newTotalSeconds / 60));
                    const deltaMinutes = Math.max(0, newActualMinutes - prevMinutes);

                    tasks = tasks.map(t => {
                        if (String(t.id) === targetId) {
                            return {
                                ...t,
                                status: t.status === 'pending' ? 'in-progress' : t.status,
                                actualTime: newActualMinutes,
                                _accumulatedSeconds: newTotalSeconds
                            };
                        }
                        return t;
                    });
                    saveTasksToStorage();

                    if (deltaMinutes > 0) {
                        pomoStats.totalFocusMinutes += deltaMinutes;
                        savePomoStatsToStorage();
                    }
                }
            } else {
                const delta = Math.max(1, Math.round(unloggedFocusSeconds / 60));
                pomoStats.totalFocusMinutes += delta;
                savePomoStatsToStorage();
            }
            unloggedFocusSeconds = 0;
        }

        updateSelectedFocusTaskMeta();
        renderTimeTrackingListAndPomoStats();
        renderTasks();
    }

    if (focusTaskSelect) {
        focusTaskSelect.addEventListener('change', () => {
            if (unloggedFocusSeconds > 0 && selectedFocusTaskId) {
                commitElapsedFocusTime(false);
            }
            selectedFocusTaskId = String(focusTaskSelect.value || '');
            updateSelectedFocusTaskMeta();
            renderTimeTrackingListAndPomoStats();
        });
    }

    if (timeTrackedListEl) {
        timeTrackedListEl.addEventListener('click', (e) => {
            const quickBtn = e.target.closest('.btn-quick-focus');
            if (!quickBtn) return;
            const targetId = String(quickBtn.dataset.id);
            if (unloggedFocusSeconds > 0 && selectedFocusTaskId) {
                commitElapsedFocusTime(false);
            }
            selectedFocusTaskId = targetId;
            focusTaskSelect.value = targetId;
            updateSelectedFocusTaskMeta();
            renderTimeTrackingListAndPomoStats();
        });
    }

    if (btnCompleteFocusedTask) {
        btnCompleteFocusedTask.addEventListener('click', () => {
            if (!selectedFocusTaskId) return;
            if (isTimerRunning) pausePomodoroTimer();
            commitElapsedFocusTime(false);

            const targetId = String(selectedFocusTaskId);
            tasks = tasks.map(t => (String(t.id) === targetId ? { ...t, status: 'completed' } : t));
            saveTasksToStorage();

            const allTasks = loadJSONFromStorage(TASKS_STORAGE_KEY, tasks);
            const isAllSystemCompleted = Array.isArray(allTasks) && allTasks.length > 0 && allTasks.every(t => t.status === 'completed');

            if (isAllSystemCompleted) {
                playVictoryFanfare();
                fireConfettiBurst(130);
            } else {
                playSingleCompleteDing();
            }

            syncTimeModuleUI();
            renderTasks();
        });
    }

    function startPomodoroTimer() {
        if (isTimerRunning) return;

        if (currentPomoMode === 'focus' && !selectedFocusTaskId) {
            const incomplete = tasks.filter(t => t.status !== 'completed');
            if (incomplete.length > 0) {
                alert('Vui lòng chọn một công việc chưa hoàn thành ở danh sách phía trên để bắt đầu tập trung!');
                focusTaskSelect.focus();
                return;
            }
        }

                // Tự động xin quyền gửi thông báo đẩy khi người dùng bắt đầu chạy đồng hồ Pomodoro
        if ('Notification' in window && Notification.permission === 'default') {
            requestNotificationPermission();
        }

        isTimerRunning = true;
        btnPomoStart.disabled = true;
        btnPomoPause.disabled = false;
        pomoStatusBadge.textContent = currentPomoMode === 'focus' ? '🔥 Đang tập trung...' : '☕ Đang nghỉ ngơi...';

        if (currentPomoMode === 'focus' && selectedFocusTaskId) {
            const targetId = String(selectedFocusTaskId);
            tasks = tasks.map(t => (String(t.id) === targetId && t.status === 'pending' ? { ...t, status: 'in-progress' } : t));
            saveTasksToStorage();
            renderTimeTrackingListAndPomoStats();
        }

        updateTimerDisplay();

        pomoIntervalId = setInterval(() => {
            if (remainingSeconds > 0) {
                remainingSeconds--;
                if (currentPomoMode === 'focus') {
                    unloggedFocusSeconds++;
                }
                updateTimerDisplay();
            } else {
                clearInterval(pomoIntervalId);
                pomoIntervalId = null;
                isTimerRunning = false;
                btnPomoStart.disabled = false;
                btnPomoStart.innerHTML = `<i class="ri-play-fill"></i><span>Bắt đầu</span>`;
                btnPomoPause.disabled = true;

                if (currentPomoMode === 'focus') {
                    sendPomodoroNotification('⏱️ Hết giờ tập trung!', 'Bạn đã hoàn thành 1 chu kỳ Pomodoro. Hãy nghỉ ngơi!');
                    playSingleCompleteDing();
                    playBeepSound();
                    commitElapsedFocusTime(true);
                    pomoStatusBadge.textContent = '🎉 Hoàn thành phiên tập trung!';
                    alert('🎉 Chúc mừng! Bạn đã hoàn thành 1 chu kỳ Tập trung (25 phút). Thời gian đã được cộng vào công việc!');
                } else {
                    sendPomodoroNotification('🔔 Hết giờ nghỉ ngơi!', 'Đã hết thời gian giải lao. Hãy bắt đầu phiên tập trung mới nhé!');
                    playBeepSound();
                    pomoStatusBadge.textContent = '✨ Hết giờ nghỉ!';
                    alert('Đã hết thời gian nghỉ ngơi. Hãy quay lại tập trung nhé!');
                }

                remainingSeconds = totalModeSeconds;
                updateTimerDisplay();
            }
        }, 1000);
    }

    function pausePomodoroTimer() {
        if (!isTimerRunning) return;
        clearInterval(pomoIntervalId);
        pomoIntervalId = null;
        isTimerRunning = false;

        btnPomoStart.disabled = false;
        btnPomoStart.innerHTML = `<i class="ri-play-fill"></i><span>Tiếp tục</span>`;
        btnPomoPause.disabled = true;
        pomoStatusBadge.textContent = '⏸️ Đang tạm dừng';

        if (currentPomoMode === 'focus' && unloggedFocusSeconds > 0) {
            commitElapsedFocusTime(false);
        }
        updateBrowserTabTitle();
    }

    function resetPomodoroTimer() {
        if (isTimerRunning) {
            clearInterval(pomoIntervalId);
            pomoIntervalId = null;
            isTimerRunning = false;
        }

        if (currentPomoMode === 'focus' && unloggedFocusSeconds > 0) {
            commitElapsedFocusTime(false);
        }

        unloggedFocusSeconds = 0;

        // Đọc số phút trực tiếp từ pomo_settings vừa lưu để đặt lại thời gian đếm ngược tương ứng
        pomoSettings = loadPomoSettings();
        let modeMinutes = 25;
        if (currentPomoMode === 'focus') {
            modeMinutes = Number(pomoSettings.focusTime) || 25;
        } else if (currentPomoMode === 'short-break') {
            modeMinutes = Number(pomoSettings.shortBreak) || 5;
        } else if (currentPomoMode === 'long-break') {
            modeMinutes = Number(pomoSettings.longBreak) || 15;
        }

        if (POMO_MODES[currentPomoMode]) {
            POMO_MODES[currentPomoMode].minutes = modeMinutes;
        }

        totalModeSeconds = modeMinutes * 60;
        remainingSeconds = totalModeSeconds;

        btnPomoStart.disabled = false;
        btnPomoStart.innerHTML = `<i class="ri-play-fill"></i><span>Bắt đầu</span>`;
        btnPomoPause.disabled = true;
        pomoStatusBadge.textContent = POMO_MODES[currentPomoMode].label;
        updateTimerDisplay();
    }

    pomoModeBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', () => {
            const targetMode = btn.dataset.mode;
            if (targetMode === currentPomoMode) return;

            if (isTimerRunning || unloggedFocusSeconds > 0) {
                pausePomodoroTimer();
            }

            currentPomoMode = targetMode;

            // Đọc số phút trực tiếp từ pomo_settings vừa lưu để đặt lại thời gian đếm ngược tương ứng
            pomoSettings = loadPomoSettings();
            let modeMinutes = 25;
            if (targetMode === 'focus') {
                modeMinutes = Number(pomoSettings.focusTime) || 25;
            } else if (targetMode === 'short-break') {
                modeMinutes = Number(pomoSettings.shortBreak) || 5;
            } else if (targetMode === 'long-break') {
                modeMinutes = Number(pomoSettings.longBreak) || 15;
            }

            if (POMO_MODES[targetMode]) {
                POMO_MODES[targetMode].minutes = modeMinutes;
            }

            totalModeSeconds = modeMinutes * 60;
            remainingSeconds = totalModeSeconds;
            unloggedFocusSeconds = 0;

            pomoModeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (pomodoroCard) pomodoroCard.dataset.mode = targetMode;

            btnPomoStart.disabled = false;
            btnPomoStart.innerHTML = `<i class="ri-play-fill"></i><span>Bắt đầu</span>`;
            btnPomoPause.disabled = true;
            pomoStatusBadge.textContent = POMO_MODES[targetMode].label;

            updateTimerDisplay();
        });
    });

    if (btnPomoStart) btnPomoStart.addEventListener('click', startPomodoroTimer);
    if (btnPomoPause) btnPomoPause.addEventListener('click', pausePomodoroTimer);
    if (btnPomoReset) btnPomoReset.addEventListener('click', resetPomodoroTimer);

    // =========================================================================
    // 13. KHỞI CHẠY ỨNG DỤNG LẦN ĐẦU
    // =========================================================================
    checkAndResetRecurringTasks();
    saveCategoriesToStorage();
    saveTasksToStorage();
    savePomoStatsToStorage();
    populateCategoryDropdowns();
    applyViewMode();
    renderTasks();
    updateTimerDisplay();
    syncTimeModuleUI();

    // =========================================================================
    // 14. SAO LƯU (EXPORT), KHÔI PHỤC (IMPORT) DỮ LIỆU & CÀI ĐẶT
    // =========================================================================
    // Helper tải Blob về máy (Hỗ trợ Electron, Trình duyệt máy tính & Android Web Share API)
    function triggerAnchorDownload(blob, fileName) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 400);
    }

    function downloadBlobFile(blob, fileName) {
        if (navigator.canShare && navigator.share) {
            try {
                const file = new File([blob], fileName, { type: blob.type || 'application/octet-stream' });
                if (navigator.canShare({ files: [file] })) {
                    navigator.share({
                        files: [file],
                        title: fileName,
                        text: `Tải/Chia sẻ file: ${fileName}`
                    }).catch(() => {
                        triggerAnchorDownload(blob, fileName);
                    });
                    return;
                }
            } catch (e) {
                // Fallback xuống triggerAnchorDownload
            }
        }
        triggerAnchorDownload(blob, fileName);
    }

    if (btnExportJson) {
        btnExportJson.addEventListener('click', () => {
            try {
                const backupData = {
                    version: "2.0",
                    exportDate: new Date().toISOString(),
                    tasks: loadJSONFromStorage(TASKS_STORAGE_KEY, tasks),
                    categories: loadJSONFromStorage(CATEGORIES_STORAGE_KEY, categories),
                    pomoStats: loadJSONFromStorage(POMO_STATS_STORAGE_KEY, pomoStats),
                    pomoSettings: loadJSONFromStorage(POMO_SETTINGS_STORAGE_KEY, pomoSettings),
                    habits: loadJSONFromStorage(HABITS_STORAGE_KEY, habits),
                    notes: loadJSONFromStorage(NOTES_STORAGE_KEY, notes)
                };

                const jsonStr = JSON.stringify(backupData, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const fileName = `personal_workspace_backup_${getTodayISO()}.json`;
                downloadBlobFile(blob, fileName);
                showToast('Đã sao lưu toàn bộ dữ liệu ra file JSON!', 'success');
            } catch (err) {
                alert('Có lỗi xảy ra khi sao lưu dữ liệu!');
            }
        });
    }

    if (btnImportJson && importJsonInput) {
        if (btnImportJson) btnImportJson.addEventListener('click', () => {
            importJsonInput.click();
        });

        if (importJsonInput) importJsonInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    // 1. Parse dữ liệu an toàn bằng try...catch
                    const data = JSON.parse(event.target.result);
                    if (!data) {
                        throw new Error('Dữ liệu file JSON rỗng!');
                    }

                    if (!confirm('Khôi phục dữ liệu sẽ ghi đè lên dữ liệu hiện tại, bạn có chắc chắn không?')) {
                        importJsonInput.value = '';
                        return;
                    }

                    let rawTasks = null;
                    let rawCategories = null;
                    let rawPomoStats = null;
                    let rawPomoSettings = null;
                    let rawHabits = null;
                    let rawNotes = null;

                    // 2. Xử lý đa dạng cấu trúc File JSON (Cả Object chứa key lẫn Mảng Array)
                    if (Array.isArray(data)) {
                        // Trường hợp File là Mảng (Array) các task
                        rawTasks = data;
                    } else if (typeof data === 'object') {
                        // Trường hợp File là Object chứa các key chuẩn (hỗ trợ cả prefix lẫn key rút gọn)
                        rawTasks = data.personal_workspace_tasks_v1 || data.tasks || null;
                        rawCategories = data.personal_workspace_categories_v1 || data.categories || null;
                        rawPomoStats = data.personal_workspace_pomo_stats_v1 || data.pomoStats || null;
                        rawPomoSettings = data.personal_workspace_pomo_settings_v1 || data.pomoSettings || null;
                        rawHabits = data.personal_workspace_habits_v1 || data.habits || null;
                        rawNotes = data.personal_workspace_notes_v1 || data.notes || null;
                    }

                    // Chuẩn hóa và lưu Tasks
                    if (Array.isArray(rawTasks)) {
                        tasks = rawTasks.map(t => {
                            const rawStatus = t.status === 'completed'
                                ? 'completed'
                                : (t.status === 'in-progress' ? 'in-progress' : 'pending');
                            const rawQuad = t.quadrant ? String(t.quadrant).toLowerCase() : 'q2';
                            const validQuad = ['q1', 'q2', 'q3', 'q4'].includes(rawQuad)
                                ? rawQuad
                                : suggestEisenhowerQuadrant(t.priority || 'medium', t.dueDate);

                            return {
                                id: String(t.id || generateUniqueId('task')),
                                title: String(t.title || 'Công việc chưa đặt tên'),
                                categoryId: t.categoryId ? String(t.categoryId) : 'none',
                                priority: t.priority ? String(t.priority).toLowerCase() : 'medium',
                                dueDate: t.dueDate || '',
                                quadrant: validQuad,
                                scope: t.scope || calculateTaskScope(t.dueDate),
                                recurring: t.recurring || 'none',
                                lastResetDate: t.lastResetDate || getTodayISO(),
                                status: rawStatus,
                                actualTime: typeof t.actualTime === 'number' && !isNaN(t.actualTime) ? t.actualTime : 0,
                                subtasks: Array.isArray(t.subtasks) ? t.subtasks.map(s => ({
                                    id: String(s.id || generateUniqueId('sub')),
                                    title: String(s.title || ''),
                                    completed: Boolean(s.completed)
                                })) : []
                            };
                        });
                        saveTasksToStorage();
                    }

                    // Chuẩn hóa và lưu Categories
                    if (Array.isArray(rawCategories) && rawCategories.length > 0) {
                        categories = rawCategories.map(c => ({
                            id: String(c.id || generateUniqueId('cat')),
                            name: String(c.name || 'Loại việc'),
                            icon: String(c.icon || '📁'),
                            color: String(c.color || '#2563EB')
                        }));
                        saveCategoriesToStorage();
                    }

                    // Chuẩn hóa và lưu Pomo Stats
                    if (rawPomoStats && typeof rawPomoStats === 'object') {
                        pomoStats = {
                            date: rawPomoStats.date || getTodayISO(),
                            completedCycles: Number(rawPomoStats.completedCycles) || 0,
                            totalFocusMinutes: Number(rawPomoStats.totalFocusMinutes) || 0
                        };
                        savePomoStatsToStorage();
                    }

                    // Chuẩn hóa và lưu Pomo Settings
                    if (rawPomoSettings && typeof rawPomoSettings === 'object') {
                        pomoSettings = {
                            focusTime: Number(rawPomoSettings.focusTime ?? rawPomoSettings.focusMinutes) || 25,
                            shortBreak: Number(rawPomoSettings.shortBreak ?? rawPomoSettings.shortBreakMinutes) || 5,
                            longBreak: Number(rawPomoSettings.longBreak ?? rawPomoSettings.longBreakMinutes) || 15,
                            enableSound: rawPomoSettings.enableSound !== false
                        };
                        savePomoSettingsToStorage();
                        applyPomoSettings();
                    }

                    // 3. ĐẶT LẠI BỘ LỌC VỀ TRẠNG THÁI MẶC ĐỊNH
                    currentStatusFilter = 'all';
                    currentCategoryFilter = 'all';
                    currentPriorityFilter = 'all';
                    currentDueDateFilter = 'all';
                    currentSearchQuery = '';
                    currentSortMode = 'smart';

                    if (searchTaskInput) searchTaskInput.value = '';
                    if (filterBtns) {
                        filterBtns.forEach(btn => {
                            btn.classList.toggle('active', btn.dataset.filter === 'all');
                        });
                    }
                    if (filterCategorySelect) filterCategorySelect.value = 'all';
                    if (filterPrioritySelect) filterPrioritySelect.value = 'all';
                    if (filterDueDateSelect) filterDueDateSelect.value = 'all';
                    if (filterStatusSelect) filterStatusSelect.value = 'all';
                    if (taskSortSelect) taskSortSelect.value = 'smart';
                    updateActiveFiltersBadge();

                    // Khôi phục Habits & Notes nếu có
                    if (Array.isArray(rawHabits)) {
                        habits = rawHabits;
                        saveHabitsToStorage();
                        renderHabits();
                        updateHabitStats();
                    }
                    if (Array.isArray(rawNotes)) {
                        notes = rawNotes;
                        saveNotesToStorage();
                        renderNotes();
                        renderNoteTags();
                    }

                    // 4. ĐỒNG BỘ LẠI TẤT CẢ CÁC HÀM RENDER NGAY LẬP TỨC
                    populateCategoryDropdowns();
                    renderCategoryManagerList();
                    renderTasks();
                    updateDashboardStats();
                    syncTimeModuleUI();

                    alert('🎉 Khôi phục dữ liệu thành công!');
                } catch (err) {
                    alert('Lỗi: File JSON không đúng định dạng hoặc bị hỏng! Chi tiết: ' + err.message);
                } finally {
                    importJsonInput.value = '';
                }
            };
            reader.readAsText(file, 'utf-8');
        });
    }

    // =========================================================================
    // =========================================================================
    // 15. TOAST THÔNG BÁO & MODAL CÀI ĐẶT HỆ THỐNG & POMODORO
    // =========================================================================
    function showToast(message, type = 'success') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'app-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'app-toast toast-' + type;
        const iconClass = type === 'success' ? 'ri-checkbox-circle-fill' : 'ri-information-fill';
        toast.innerHTML = '<i class="' + iconClass + '" style="font-size: 1.25rem; flex-shrink: 0;"></i><span>' + message + '</span>';

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, 3000);
    }

    function openSettingsModal() {
        if (!settingsModal) return;
        updateNotificationUI();
        // Điền đúng các giá trị hiện tại trong LocalStorage vào các ô Input và công tắc Toggle
        pomoSettings = loadPomoSettings();

        if (settingFocusTime) settingFocusTime.value = pomoSettings.focusTime;
        if (settingShortBreak) settingShortBreak.value = pomoSettings.shortBreak;
        if (settingLongBreak) settingLongBreak.value = pomoSettings.longBreak;
        if (settingEnableSound) settingEnableSound.checked = pomoSettings.enableSound !== false;

        settingsModal.classList.add('active');
        settingsModal.setAttribute('aria-hidden', 'false');
    }

    function closeSettingsModal() {
        if (!settingsModal) return;
        settingsModal.classList.remove('active');
        settingsModal.setAttribute('aria-hidden', 'true');
    }

    if (btnOpenSettings) btnOpenSettings.addEventListener('click', openSettingsModal);
    if (btnCloseSettingsModal) btnCloseSettingsModal.addEventListener('click', closeSettingsModal);
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) closeSettingsModal();
        });
    }

    if (btnResetSettings) {
        btnResetSettings.addEventListener('click', () => {
            if (confirm('Khôi phục cài đặt Pomodoro và âm thanh về mặc định?')) {
                pomoSettings = { ...DEFAULT_POMO_SETTINGS };
                savePomoSettingsToStorage();
                applyPomoSettings();
                if (settingFocusTime) settingFocusTime.value = DEFAULT_POMO_SETTINGS.focusTime;
                if (settingShortBreak) settingShortBreak.value = DEFAULT_POMO_SETTINGS.shortBreak;
                if (settingLongBreak) settingLongBreak.value = DEFAULT_POMO_SETTINGS.longBreak;
                if (settingEnableSound) settingEnableSound.checked = DEFAULT_POMO_SETTINGS.enableSound;
                showToast('Đã khôi phục cài đặt mặc định!');
            }
        });
    }

    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const focusVal = Math.max(1, parseInt(settingFocusTime.value, 10) || 25);
            const shortVal = Math.max(1, parseInt(settingShortBreak.value, 10) || 5);
            const longVal = Math.max(1, parseInt(settingLongBreak.value, 10) || 15);
            const soundVal = settingEnableSound ? settingEnableSound.checked : true;

            pomoSettings = {
                focusTime: focusVal,
                shortBreak: shortVal,
                longBreak: longVal,
                enableSound: soundVal
            };

            savePomoSettingsToStorage();
            applyPomoSettings();
            closeSettingsModal();
            showToast('Đã lưu cài đặt!');
        });
    }

    // Áp dụng cấu hình Pomodoro đã lưu ngay khi khởi động
        // =========================================================================
    // 16. CHẾ ĐỘ TỐI (DARK MODE) & WEB NOTIFICATION API
    // =========================================================================
    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        try {
            localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
        } catch(e) {}

        if (themeToggleIcon) {
            themeToggleIcon.className = isDark ? 'ri-sun-line' : 'ri-moon-line';
        }

        if (themeToggleText) {
            themeToggleText.textContent = isDark ? 'Sáng' : 'Tối';
        }
        if (btnToggleTheme) {
            btnToggleTheme.title = isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối';
        }
    }

    function initTheme() {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme === 'dark' || savedTheme === 'light') {
                applyTheme(savedTheme);
            } else {
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                applyTheme(prefersDark ? 'dark' : 'light');
            }
        } catch(e) {
            applyTheme('light');
        }
    }

    if (btnToggleTheme) {
        btnToggleTheme.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            showToast(nextTheme === 'dark' ? 'Đã bật Chế độ Tối (Dark Mode)' : 'Đã bật Chế độ Sáng (Light Mode)');
        });
    }

    // Cập nhật giao diện trạng thái Web Notification
    function updateNotificationUI() {
        if (!('Notification' in window)) {
            if (notifStatusBadge) {
                notifStatusBadge.textContent = '✕ Trình duyệt không hỗ trợ';
                notifStatusBadge.className = 'notif-badge notif-badge-denied';
            }
            if (btnRequestNotif) btnRequestNotif.disabled = true;
            if (btnPomoNotifToggle) btnPomoNotifToggle.disabled = true;
            return;
        }

        const perm = Notification.permission;
        if (perm === 'granted') {
            if (notifStatusBadge) {
                notifStatusBadge.textContent = '✓ Đã cấp quyền thông báo';
                notifStatusBadge.className = 'notif-badge notif-badge-granted';
            }
            if (btnRequestNotifText) btnRequestNotifText.textContent = 'Đã bật ✓';
            if (pomoNotifBtnText) pomoNotifBtnText.textContent = 'Thông báo: Đã bật ✓';
        } else if (perm === 'denied') {
            if (notifStatusBadge) {
                notifStatusBadge.textContent = '✕ Đang bị chặn trên trình duyệt';
                notifStatusBadge.className = 'notif-badge notif-badge-denied';
            }
            if (btnRequestNotifText) btnRequestNotifText.textContent = 'Bị chặn ⚠️';
            if (pomoNotifBtnText) pomoNotifBtnText.textContent = 'Thông báo: Bị chặn ⚠️';
        } else {
            if (notifStatusBadge) {
                notifStatusBadge.textContent = 'Chưa bật thông báo';
                notifStatusBadge.className = 'notif-badge notif-badge-default';
            }
            if (btnRequestNotifText) btnRequestNotifText.textContent = 'Bật thông báo';
            if (pomoNotifBtnText) pomoNotifBtnText.textContent = 'Bật thông báo đẩy';
        }
    }

    async function requestNotificationPermission() {
        if (!('Notification' in window)) {
            showToast('Trình duyệt của bạn không hỗ trợ thông báo đẩy.', 'info');
            updateNotificationUI();
            return false;
        }

        if (Notification.permission === 'granted') {
            updateNotificationUI();
            showToast('Thông báo đẩy đã được cấp quyền trước đó.', 'success');
            return true;
        }

        if (Notification.permission === 'denied') {
            showToast('Thông báo đang bị chặn. Vui lòng bật lại trong cài đặt trang web của trình duyệt.', 'warning');
            updateNotificationUI();
            return false;
        }

        try {
            const permission = await Notification.requestPermission();
            updateNotificationUI();
            if (permission === 'granted') {
                showToast('Đã bật thông báo đẩy trình duyệt!', 'success');
                sendPomodoroNotification('🔔 Thông báo đẩy đã kích hoạt', 'Bạn sẽ nhận được thông báo khi hết giờ Pomodoro!');
                return true;
            } else {
                showToast('Bạn đã từ chối quyền thông báo.', 'info');
                return false;
            }
        } catch (err) {
            console.error('Lỗi yêu cầu quyền thông báo:', err);
            return false;
        }
    }

    function sendPomodoroNotification(title, body) {
        if (!('Notification' in window)) return;
        if (Notification.permission !== 'granted') return;

        try {
            const notifIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><circle cx="12" cy="12" r="10" fill="%234F46E5"/><circle cx="12" cy="12" r="7" fill="%23ffffff"/><polygon points="12,7 12,12 15,14" fill="%234F46E5"/></svg>';
            const notification = new Notification(title, {
                body: body,
                icon: notifIcon,
                badge: notifIcon,
                requireInteraction: true,
                tag: 'pomodoro-timer-alert',
                renotify: true
            });

            notification.onclick = function() {
                try {
                    window.focus();
                } catch(e) {}
                this.close();
            };
        } catch (err) {
            console.error('Lỗi gửi Web Notification:', err);
        }
    }

    if (btnRequestNotif) {
        btnRequestNotif.addEventListener('click', () => {
            requestNotificationPermission();
        });
    }

    if (btnPomoNotifToggle) {
        btnPomoNotifToggle.addEventListener('click', () => {
            requestNotificationPermission();
        });
    }

    // Khởi tạo Theme & Notification UI
    initTheme();
    updateNotificationUI();
    applyPomoSettings();


// 17. XUẤT / NHẬP DỮ LIỆU BẰNG FILE EXCEL (.XLSX / .CSV) - SHEETJS & NATIVE FALLBACK
    // =========================================================================
    const exportExcelBtn = document.getElementById('exportExcelBtn');
    const importExcelBtn = document.getElementById('importExcelBtn');
    const importExcelInput = document.getElementById('importExcelInput');
    const downloadExcelTemplateBtn = document.getElementById('downloadExcelTemplateBtn');

    // Nút trong Modal Settings
    const exportExcelModalBtn = document.getElementById('exportExcelModalBtn');
    const importExcelModalBtn = document.getElementById('importExcelModalBtn');
    const downloadExcelTemplateModalBtn = document.getElementById('downloadExcelTemplateModalBtn');

    // Helper escape ô cho định dạng CSV chuẩn RFC 4180
    function escapeCSVCell(val) {
        if (val === null || val === undefined) return '""';
        let str = String(val);
        if (str.includes('"') || str.includes(',') || str.includes(';') || str.includes('\n') || str.includes('\r')) {
            str = '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    }

    // Helper format ngày thành YYYY-MM-DD
    function formatDateToISO(val) {
        if (!val) return '';
        if (val instanceof Date && !isNaN(val.getTime())) {
            const y = val.getFullYear();
            const m = String(val.getMonth() + 1).padStart(2, '0');
            const d = String(val.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        }
        const str = String(val).trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
            return str;
        }
        const parsed = new Date(str);
        if (!isNaN(parsed.getTime())) {
            const y = parsed.getFullYear();
            const m = String(parsed.getMonth() + 1).padStart(2, '0');
            const d = String(parsed.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        }
        return '';
    }

    // 1. Logic Xuất file Excel (Hỗ trợ SheetJS .xlsx & Native Fallback .csv)
    function exportTasksToExcel() {
        const categoryMap = new Map();
        categories.forEach(c => categoryMap.set(c.id, c.name));

        const priorityLabelMap = {
            high: 'Cao',
            medium: 'Trung bình',
            low: 'Thấp'
        };

        const quadrantLabelMap = {
            q1: 'Q1',
            q2: 'Q2',
            q3: 'Q3',
            q4: 'Q4'
        };

        const recurringLabelMap = {
            none: 'Một lần',
            daily: 'Hằng ngày',
            weekly: 'Hằng tuần'
        };

        const excelRows = tasks.map(t => {
            const catName = categoryMap.get(t.categoryId) || (t.categoryId === 'none' ? 'Không có' : t.categoryId);
            const prioLabel = priorityLabelMap[t.priority] || 'Trung bình';
            const quadLabel = quadrantLabelMap[t.quadrant] || 'Q2';
            const statusLabel = t.status === 'completed' ? 'Đã xong' : 'Cần làm';
            const recurLabel = recurringLabelMap[t.recurring] || 'Một lần';
            const subtasksStr = Array.isArray(t.subtasks) 
                ? t.subtasks.map(s => s.title ? s.title.trim() : '').filter(Boolean).join('; ') 
                : '';

            return {
                'Mã Task': t.id,
                'Tên công việc': t.title,
                'Loại việc': catName,
                'Mức ưu tiên': prioLabel,
                'Ngày đến hạn': t.dueDate || '',
                'Ma trận': quadLabel,
                'Trạng thái': statusLabel,
                'Chu kỳ': recurLabel,
                'Việc con': subtasksStr
            };
        });

        if (typeof XLSX !== 'undefined') {
            try {
                const worksheet = XLSX.utils.json_to_sheet(excelRows);
                worksheet['!cols'] = [
                    { wch: 16 },
                    { wch: 42 },
                    { wch: 18 },
                    { wch: 14 },
                    { wch: 15 },
                    { wch: 10 },
                    { wch: 14 },
                    { wch: 14 },
                    { wch: 35 }
                ];

                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'CongViec');

                const fileName = `Personal_Workspace_Tasks_${getTodayISO()}.xlsx`;
                XLSX.writeFile(workbook, fileName);
                showToast(`Đã xuất ${tasks.length} công việc ra file Excel (.xlsx)!`, 'success');
                return;
            } catch (err) {
                console.warn('Lỗi khi dùng XLSX.writeFile, chuyển sang Native CSV export:', err);
            }
        }

        const headers = ['Mã Task', 'Tên công việc', 'Loại việc', 'Mức ưu tiên', 'Ngày đến hạn', 'Ma trận', 'Trạng thái', 'Chu kỳ', 'Việc con'];
        const csvLines = [headers.map(escapeCSVCell).join(',')];

        excelRows.forEach(row => {
            const line = headers.map(h => escapeCSVCell(row[h] || '')).join(',');
            csvLines.push(line);
        });

        const csvContent = '\uFEFF' + csvLines.join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const fileName = `Personal_Workspace_Tasks_${getTodayISO()}.csv`;
        downloadBlobFile(blob, fileName);
        showToast(`Đã xuất ${tasks.length} công việc ra file CSV (Tương thích Excel)!`, 'success');
    }

    // 2. Logic Tải file Mẫu Excel
    function downloadExcelTemplate() {
        const templateData = [
            {
                'Mã Task': 'TASK-001',
                'Tên công việc': 'Hoàn thành báo cáo đánh giá quý',
                'Loại việc': 'Công việc',
                'Mức ưu tiên': 'Cao',
                'Ngày đến hạn': getOffsetDateISO(2),
                'Ma trận': 'Q1',
                'Trạng thái': 'Cần làm',
                'Chu kỳ': 'Một lần',
                'Việc con': 'Tổng hợp số liệu; Soạn thảo slide trình chiếu; Gửi email duyệt'
            },
            {
                'Mã Task': 'TASK-002',
                'Tên công việc': 'Chạy bộ 30 phút rèn luyện thể lực',
                'Loại việc': 'Cá nhân',
                'Mức ưu tiên': 'Trung bình',
                'Ngày đến hạn': getTodayISO(),
                'Ma trận': 'Q2',
                'Trạng thái': 'Cần làm',
                'Chu kỳ': 'Hằng ngày',
                'Việc con': 'Khởi động 5 phút; Chạy bộ 25 phút'
            },
            {
                'Mã Task': 'TASK-003',
                'Tên công việc': 'Đọc sách chuyên môn 20 trang',
                'Loại việc': 'Học tập',
                'Mức ưu tiên': 'Thấp',
                'Ngày đến hạn': getOffsetDateISO(5),
                'Ma trận': 'Q2',
                'Trạng thái': 'Đã xong',
                'Chu kỳ': 'Hằng tuần',
                'Việc con': 'Ghi chú các ý quan trọng'
            }
        ];

        if (typeof XLSX !== 'undefined') {
            try {
                const worksheet = XLSX.utils.json_to_sheet(templateData);
                worksheet['!cols'] = [
                    { wch: 14 },
                    { wch: 38 },
                    { wch: 16 },
                    { wch: 14 },
                    { wch: 14 },
                    { wch: 10 },
                    { wch: 12 },
                    { wch: 12 },
                    { wch: 35 }
                ];

                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'MauNhapTask');
                XLSX.writeFile(workbook, 'Mau_Nhap_Cong_Viec_Personal_Workspace.xlsx');
                showToast('Đã tải xuống file mẫu Excel (.xlsx)!', 'success');
                return;
            } catch (err) {
                console.warn('Lỗi khi dùng XLSX.writeFile cho template, chuyển sang Native CSV:', err);
            }
        }

        const headers = ['Mã Task', 'Tên công việc', 'Loại việc', 'Mức ưu tiên', 'Ngày đến hạn', 'Ma trận', 'Trạng thái', 'Chu kỳ', 'Việc con'];
        const csvLines = [headers.map(escapeCSVCell).join(',')];

        templateData.forEach(row => {
            const line = headers.map(h => escapeCSVCell(row[h] || '')).join(',');
            csvLines.push(line);
        });

        const csvContent = '\uFEFF' + csvLines.join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        downloadBlobFile(blob, 'Mau_Nhap_Cong_Viec_Personal_Workspace.csv');
        showToast('Đã tải xuống file mẫu CSV (Tương thích Excel)!', 'success');
    }

    function parseCSVLine(line, delimiter = ',') {
        const result = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    cur += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (c === delimiter && !inQuotes) {
                result.push(cur.trim());
                cur = '';
            } else {
                cur += c;
            }
        }
        result.push(cur.trim());
        return result;
    }

    function processImportedTaskRows(rows) {
        if (!rows || rows.length === 0) {
            showToast('File không có dữ liệu!', 'warning');
            return;
        }

        let importedCount = 0;
        let updatedCount = 0;

        rows.forEach(row => {
            const titleKey = Object.keys(row).find(k => /tên\s*công\s*việc|tiêu\s*đề|tÃªn\s*cÃ´ng\s*viá»‡c|tiÃªu\s*Ä‘á»\x81|task|title/i.test(k));
            const rawTitle = titleKey ? String(row[titleKey]).trim() : '';
            if (!rawTitle) return;

            const catKey = Object.keys(row).find(k => /loại\s*việc|danh\s*mục|loáº¡i\s*viá»‡c|danh\s*má»¥c|category/i.test(k));
            const rawCat = catKey ? String(row[catKey]).trim() : '';
            let matchedCatId = 'none';

            if (rawCat && rawCat !== 'Không có' && rawCat !== 'KhÃ´ng cÃ³') {
                const existingCat = categories.find(c => c.name.toLowerCase() === rawCat.toLowerCase());
                if (existingCat) {
                    matchedCatId = existingCat.id;
                } else {
                    const newCat = {
                        id: generateUniqueId('cat'),
                        name: rawCat,
                        icon: '📁',
                        color: '#2563EB'
                    };
                    categories.push(newCat);
                    matchedCatId = newCat.id;
                    saveCategoriesToStorage();
                    populateCategoryDropdowns(); 
                    renderCategoryManagerList();
                }
            }

            const prioKey = Object.keys(row).find(k => /mức\s*ưu\s*tiên|ưu\s*tiên|má»©c\s*Æ°u\s*tiÃªn|Æ°u\s*tiÃªn|priority/i.test(k));
            const rawPrio = prioKey ? String(row[prioKey]).trim().toLowerCase() : '';
            let priority = 'medium';
            if (rawPrio.includes('cao') || rawPrio === 'high') priority = 'high';
            else if ((rawPrio.includes('thấp') || rawPrio.includes('tháº¥p')) || rawPrio === 'low') priority = 'low';

            const dueKey = Object.keys(row).find(k => /ngày\s*đến\s*hạn|hạn\s*chót|hạn|ngày\s*Ä‘áº¿n\s*háº¡n|háº¡n\s*chÃ³t|háº¡n|due/i.test(k));
            const dueDate = dueKey ? formatDateToISO(row[dueKey]) : '';

            const quadKey = Object.keys(row).find(k => /ma\s*trận|ma\s*trận|quadrant/i.test(k));
            const rawQuad = quadKey ? String(row[quadKey]).trim().toLowerCase() : '';
            let quadrant = 'q2';
            if (['q1', 'q2', 'q3', 'q4'].includes(rawQuad)) {
                quadrant = rawQuad;
            } else if (rawQuad.includes('1')) quadrant = 'q1';
            else if (rawQuad.includes('2')) quadrant = 'q2';
            else if (rawQuad.includes('3')) quadrant = 'q3';
            else if (rawQuad.includes('4')) quadrant = 'q4';
            else {
                quadrant = suggestEisenhowerQuadrant(priority, dueDate);
            }

            const statusKey = Object.keys(row).find(k => /trạng\s*thái|tráº¡ng\s*thÃ¡i|status/i.test(k));
            const rawStatus = statusKey ? String(row[statusKey]).trim().toLowerCase() : '';
            let status = 'pending';
            if ((rawStatus.includes('xong') || rawStatus.includes('hoàn thành') || rawStatus.includes('hoÃ n thÃ nh')) || rawStatus === 'completed') {
                status = 'completed';
            }

            const recurKey = Object.keys(row).find(k => /chu\s*kỳ|lặp|chu\s*ká»³|láº·p|recurring/i.test(k));
            const rawRecur = recurKey ? String(row[recurKey]).trim().toLowerCase() : '';
            let recurring = 'none';
            if ((rawRecur.includes('ngày') || rawRecur.includes('ngày')) || rawRecur === 'daily') recurring = 'daily';
            else if ((rawRecur.includes('tuần') || rawRecur.includes('tuáº§n')) || rawRecur === 'weekly') recurring = 'weekly';

            const subKey = Object.keys(row).find(k => /việc\s*con|viá»‡c\s*con|subtask/i.test(k));
            const rawSub = subKey ? String(row[subKey]).trim() : '';
            let subtasks = [];
            if (rawSub) {
                subtasks = rawSub.split(';')
                    .map(s => s.trim())
                    .filter(Boolean)
                    .map(s => ({
                                id: generateUniqueId('sub'),
                        title: s,
                        completed: false
                    }));
            }

            const idKey = Object.keys(row).find(k => /mã\s*task|mã|mÃ£\s*task|mÃ£|id/i.test(k));
            const rawId = idKey ? String(row[idKey]).trim() : '';

            const existingTaskIndex = rawId ? tasks.findIndex(t => t.id === rawId) : -1;

            if (existingTaskIndex !== -1) {
                const prevTask = tasks[existingTaskIndex];
                tasks[existingTaskIndex] = {
                    ...prevTask,
                    title: rawTitle,
                    categoryId: matchedCatId,
                    priority: priority,
                    dueDate: dueDate,
                    quadrant: quadrant,
                    scope: calculateTaskScope(dueDate),
                    status: status,
                    recurring: recurring,
                    subtasks: subtasks.length > 0 ? subtasks : prevTask.subtasks
                };
                updatedCount++;
            } else {
                const newTask = {
                    id: rawId || generateUniqueId('task'),
                    title: rawTitle,
                    categoryId: matchedCatId,
                    priority: priority,
                    dueDate: dueDate,
                    quadrant: quadrant,
                    scope: calculateTaskScope(dueDate),
                    recurring: recurring,
                    lastResetDate: getTodayISO(),
                    status: status,
                    actualTime: 0,
                    subtasks: subtasks
                };
                tasks.push(newTask);
                importedCount++;
            }
        });

        saveTasksToStorage();
        renderTasks(); 
        updateDashboardStats();
        syncTimeModuleUI();

        const msg = updatedCount > 0 
            ? `Đã nhập xong: thêm mới ${importedCount} và cập nhật ${updatedCount} công việc!`
            : `Đã nhập thành công ${importedCount} công việc từ file!`;
        showToast(msg, 'success');
    }

    // 3. Logic Nhập file Excel
    function importTasksFromExcel(file) {
        if (!file) return;

        if (typeof XLSX !== 'undefined') {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array', cellDates: true });
                    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
                        showToast('File Excel không có sheet nào!', 'warning');
                        return;
                    }

                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const rows = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
                    processImportedTaskRows(rows);
                } catch (err) {
                    console.error('Lỗi khi đọc file bằng SheetJS:', err);
                    showToast('Lỗi khi đọc file Excel: ' + err.message, 'warning');
                } finally {
                    if (importExcelInput) importExcelInput.value = '';
                }
            };
            reader.onerror = function() {
                showToast('Không thể đọc file đã chọn!', 'warning');
                if (importExcelInput) importExcelInput.value = '';
            };
            reader.readAsArrayBuffer(file);
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                let text = e.target.result || '';
                if (text.charCodeAt(0) === 0xFEFF) {
                    text = text.slice(1);
                }
                const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
                if (lines.length < 2) {
                    showToast('File CSV không có dữ liệu hợp lệ!', 'warning');
                    return;
                }

                const firstLine = lines[0];
                const delimiter = (firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length ? ';' : ',';
                const headers = parseCSVLine(firstLine, delimiter);

                const rows = [];
                for (let i = 1; i < lines.length; i++) {
                    const values = parseCSVLine(lines[i], delimiter);
                    const rowObj = {};
                    headers.forEach((h, idx) => {
                        rowObj[h] = values[idx] !== undefined ? values[idx] : '';
                    });
                    rows.push(rowObj);
                }

                processImportedTaskRows(rows);
            } catch (err) {
                console.error('Lỗi khi parse file CSV:', err);
                showToast('Lỗi khi đọc file CSV: ' + err.message, 'warning');
            } finally {
                if (importExcelInput) importExcelInput.value = '';
            }
        };
        reader.onerror = function() {
            showToast('Không thể đọc file đã chọn!', 'warning');
            if (importExcelInput) importExcelInput.value = '';
        };
        reader.readAsText(file, 'utf-8');
    }

    if (exportExcelBtn) exportExcelBtn.addEventListener('click', exportTasksToExcel);
    if (exportExcelModalBtn) exportExcelModalBtn.addEventListener('click', exportTasksToExcel);

    if (downloadExcelTemplateBtn) downloadExcelTemplateBtn.addEventListener('click', downloadExcelTemplate);
    if (downloadExcelTemplateModalBtn) downloadExcelTemplateModalBtn.addEventListener('click', downloadExcelTemplate);

    if (importExcelBtn && importExcelInput) {
        if (importExcelBtn) importExcelBtn.addEventListener('click', () => {
            importExcelInput.click();
        });
    }

    if (importExcelModalBtn && importExcelInput) {
        if (importExcelModalBtn) importExcelModalBtn.addEventListener('click', () => {
            importExcelInput.click();
        });
    }

    if (importExcelInput) {
        importExcelInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                importTasksFromExcel(file);
            }
        });
    }

    // =========================================================================
    // 17B. MENU POPOVER QUẢN LÝ DỮ LIỆU (DATA DROPDOWN POPOVER CONTROLLER)
    // =========================================================================
    function toggleDataMenu(forceState) {
        if (!dataDropdownPanel || !btnToggleDataMenu) return;
        const isCurrentlyOpen = dataDropdownPanel.classList.contains('active');
        const willOpen = forceState !== undefined ? forceState : !isCurrentlyOpen;

        if (willOpen) {
            dataDropdownPanel.classList.add('active');
            btnToggleDataMenu.classList.add('active');
            btnToggleDataMenu.setAttribute('aria-expanded', 'true');
        } else {
            dataDropdownPanel.classList.remove('active');
            btnToggleDataMenu.classList.remove('active');
            btnToggleDataMenu.setAttribute('aria-expanded', 'false');
        }
    }

    if (btnToggleDataMenu) {
        btnToggleDataMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDataMenu();
        });
    }

    // Đóng dropdown khi click ra ngoài container dữ liệu
    document.addEventListener('click', (e) => {
        if (dataDropdownPanel && dataDropdownPanel.classList.contains('active')) {
            const container = e.target.closest('.data-menu-popover-container');
            if (!container) {
                toggleDataMenu(false);
            }
        }
    });

    // Đóng dropdown khi nhấn phím Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dataDropdownPanel && dataDropdownPanel.classList.contains('active')) {
            toggleDataMenu(false);
        }
    });

    // Tự động đóng dropdown ngay sau khi người dùng bấm 1 trong 5 tùy chọn bên trong
    if (dataDropdownPanel) {
        const dataActionBtns = dataDropdownPanel.querySelectorAll('.data-dropdown-item');
        dataActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleDataMenu(false);
            });
        });
    }


    // =========================================================================
    // 18. MODULE 03: HABIT TRACKER (XÂY DỰNG THÓI QUEN & STREAK COUNTER)
    // =========================================================================
    const HABITS_STORAGE_KEY = 'personal_workspace_habits_v1';

    const DEFAULT_HABITS = [
        {
            id: 'habit_def_01',
            title: 'Chạy bộ 30 phút rèn thể lực',
            category: 'Sức khỏe',
            frequency: 'daily',
            emoji: '🏃',
            note: 'Duy trì thể lực và sự dẻo dai',
            history: {},
            streak: 0,
            bestStreak: 0,
            createdAt: getTodayISO()
        },
        {
            id: 'habit_def_02',
            title: 'Đọc 20 trang sách chuyên môn',
            category: 'Học tập',
            frequency: 'daily',
            emoji: '📚',
            note: 'Tích lũy tri thức từng ngày',
            history: {},
            streak: 0,
            bestStreak: 0,
            createdAt: getTodayISO()
        },
        {
            id: 'habit_def_03',
            title: 'Uống đủ 2 lít nước',
            category: 'Sức khỏe',
            frequency: 'daily',
            emoji: '💧',
            note: 'Thanh lọc cơ thể và tăng tập trung',
            history: {},
            streak: 0,
            bestStreak: 0,
            createdAt: getTodayISO()
        }
    ];

    let habits = loadJSONFromStorage(HABITS_STORAGE_KEY, DEFAULT_HABITS);
    let currentHabitFilter = 'all';
    let currentHabitSearch = '';

    // DOM Elements for Habits
    const habitCardsGrid = document.getElementById('habit-cards-grid');
    const habitSearchInput = document.getElementById('habit-search-input');
    const btnAddHabit = document.getElementById('btn-add-habit');
    const habitModal = document.getElementById('habit-modal');
    const habitForm = document.getElementById('habit-form');
    const btnCloseHabitModal = document.getElementById('btn-close-habit-modal');
    const btnCancelHabitModal = document.getElementById('btn-cancel-habit-modal');
    const habitEditId = document.getElementById('habit-edit-id');
    const habitTitleInput = document.getElementById('habit-title-input');
    const habitCategoryInput = document.getElementById('habit-category-input');
    const habitFrequencyInput = document.getElementById('habit-frequency-input');
    const habitTargetNote = document.getElementById('habit-target-note');
    const habitSelectedEmojiInput = document.getElementById('habit-selected-emoji');
    const habitEmojiBtns = document.querySelectorAll('.habit-emoji-btn');

    // Stats elements
    const habitStatTodayDone = document.getElementById('habit-stat-today-done');
    const habitStatPercentage = document.getElementById('habit-stat-percentage');
    const habitTodayProgressFill = document.getElementById('habit-today-progress-fill');
    const habitStatBestStreak = document.getElementById('habit-stat-best-streak');
    const habitStatTotalCount = document.getElementById('habit-stat-total-count');
    const habitStatTotalCheckins = document.getElementById('habit-stat-total-checkins');

    function saveHabitsToStorage() {
        try {
            localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
        } catch(e) {}
    }

    function calculateHabitStreak(habit) {
        if (!habit.history || typeof habit.history !== 'object') return 0;
        let streak = 0;
        let d = new Date();
        const todayStr = getTodayISO();

        // Nếu hôm nay chưa check-in, kiểm tra xem có chuỗi từ hôm qua không
        if (!habit.history[todayStr]) {
            d.setDate(d.getDate() - 1);
        }

        while (true) {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const iso = `${y}-${m}-${day}`;

            if (habit.history[iso]) {
                streak++;
                d.setDate(d.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    }

    function updateHabitStats() {
        if (!habits) habits = [];
        const todayStr = getTodayISO();
        const total = habits.length;
        let doneToday = 0;
        let bestStreak = 0;
        let totalCheckins = 0;

        habits.forEach(h => {
            const streak = calculateHabitStreak(h);
            h.streak = streak;
            h.bestStreak = Math.max(h.bestStreak || 0, streak);
            if (h.history && h.history[todayStr]) doneToday++;
            if (h.history) {
                totalCheckins += Object.values(h.history).filter(Boolean).length;
            }
            if (h.bestStreak > bestStreak) bestStreak = h.bestStreak;
        });

        const pct = total > 0 ? Math.round((doneToday / total) * 100) : 0;

        if (habitStatTodayDone) habitStatTodayDone.textContent = `${doneToday}/${total}`;
        if (habitStatPercentage) habitStatPercentage.textContent = `${pct}%`;
        if (habitTodayProgressFill) habitTodayProgressFill.style.width = `${pct}%`;
        if (habitStatBestStreak) habitStatBestStreak.textContent = `${bestStreak} ngày`;
        if (habitStatTotalCount) habitStatTotalCount.textContent = `${total} mục`;
        if (habitStatTotalCheckins) habitStatTotalCheckins.textContent = `${totalCheckins} lần`;
    }

    function renderHabits() {
        if (!habitCardsGrid) return;
        const todayStr = getTodayISO();

        let filtered = habits.filter(h => {
            if (currentHabitSearch) {
                const q = currentHabitSearch.toLowerCase();
                const matchTitle = (h.title || '').toLowerCase().includes(q);
                const matchCat = (h.category || '').toLowerCase().includes(q);
                if (!matchTitle && !matchCat) return false;
            }
            const isDoneToday = Boolean(h.history && h.history[todayStr]);
            if (currentHabitFilter === 'pending' && isDoneToday) return false;
            if (currentHabitFilter === 'completed' && !isDoneToday) return false;
            return true;
        });

        if (filtered.length === 0) {
            habitCardsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center;">
                    <div class="empty-icon" style="font-size: 3rem; margin-bottom: 0.5rem;">🌱</div>
                    <h3 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.35rem;">Chưa có thói quen nào</h3>
                    <p style="color: var(--text-muted); font-size: 0.88rem; max-width: 400px; margin: 0 auto 1rem;">
                        Hãy bấm nút <strong>"Thêm thói quen mới"</strong> để bắt đầu xây dựng chuỗi ngày rèn luyện kiên trì!
                    </p>
                </div>
            `;
            return;
        }

        // Tạo danh sách 7 ngày gần nhất để render dải lịch sử
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const dt = new Date();
            dt.setDate(dt.getDate() - i);
            const y = dt.getFullYear();
            const m = String(dt.getMonth() + 1).padStart(2, '0');
            const day = String(dt.getDate()).padStart(2, '0');
            const iso = `${y}-${m}-${day}`;
            const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
            last7Days.push({
                iso: iso,
                name: i === 0 ? 'Nay' : dayNames[dt.getDay()],
                isToday: i === 0
            });
        }

        habitCardsGrid.innerHTML = filtered.map(h => {
            const streak = calculateHabitStreak(h);
            const isDoneToday = Boolean(h.history && h.history[todayStr]);
            const freqLabel = h.frequency === 'weekdays' ? 'T2 - T6' : (h.frequency === '3days' ? '3 ngày/tuần' : (h.frequency === '5days' ? '5 ngày/tuần' : 'Hằng ngày'));

            const historyHtml = last7Days.map(d => {
                const checked = Boolean(h.history && h.history[d.iso]);
                const ringClass = d.isToday ? 'today-ring' : '';
                const checkedClass = checked ? 'checked' : '';
                const icon = checked ? '<i class="ri-check-line"></i>' : (d.isToday ? '•' : '');
                return `
                    <div class="habit-day-bubble" title="${d.iso}">
                        <span class="habit-day-name">${d.name}</span>
                        <div class="habit-day-dot ${ringClass} ${checkedClass}">${icon}</div>
                    </div>
                `;
            }).join('');

            return `
                <div class="habit-card ${isDoneToday ? 'completed-today' : ''}" data-id="${escapeHTML(h.id)}">
                    <div class="habit-card-header">
                        <div class="habit-header-main">
                            <div class="habit-emoji-badge">${escapeHTML(h.emoji || '🌱')}</div>
                            <div class="habit-title-box">
                                <h3 class="habit-title" title="${escapeHTML(h.title)}">${escapeHTML(h.title)}</h3>
                                <div class="habit-meta-badges">
                                    <span class="habit-tag">${escapeHTML(h.category || 'Chung')}</span>
                                    <span class="habit-tag" style="background: rgba(79, 70, 229, 0.1); color: var(--primary);">${freqLabel}</span>
                                </div>
                            </div>
                        </div>
                        <div class="habit-actions-menu">
                            <button type="button" class="btn-habit-icon btn-edit-habit" data-id="${escapeHTML(h.id)}" title="Sửa thói quen">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button type="button" class="btn-habit-icon btn-delete btn-delete-habit" data-id="${escapeHTML(h.id)}" title="Xóa thói quen">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </div>

                    ${h.note ? `<p style="font-size: 0.8rem; color: var(--text-muted); margin: 0; line-height: 1.4;"><em>"${escapeHTML(h.note)}"</em></p>` : ''}

                    <div class="habit-streak-banner">
                        <div class="habit-current-streak">
                            <i class="ri-fire-fill"></i>
                            <span>Chuỗi: ${streak} ngày</span>
                        </div>
                        <div class="habit-best-streak">
                            🏆 Kỷ lục: ${h.bestStreak || streak} ngày
                        </div>
                    </div>

                    <div class="habit-history-strip">
                        ${historyHtml}
                    </div>

                    <button type="button" class="habit-check-cta ${isDoneToday ? 'completed' : ''}" data-id="${escapeHTML(h.id)}">
                        <i class="${isDoneToday ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'}"></i>
                        <span>${isDoneToday ? 'Đã hoàn thành hôm nay' : 'Điểm danh hôm nay'}</span>
                    </button>
                </div>
            `;
        }).join('');

        // Gắn sự kiện cho các nút trên thẻ thói quen
        habitCardsGrid.querySelectorAll('.habit-check-cta').forEach(btn => {
            btn.addEventListener('click', () => {
                const habitId = btn.dataset.id;
                toggleHabitCheckin(habitId);
            });
        });

        habitCardsGrid.querySelectorAll('.btn-edit-habit').forEach(btn => {
            btn.addEventListener('click', () => {
                const habitId = btn.dataset.id;
                const habit = habits.find(x => x.id === habitId);
                if (habit) openHabitModal(habit);
            });
        });

        habitCardsGrid.querySelectorAll('.btn-delete-habit').forEach(btn => {
            btn.addEventListener('click', () => {
                const habitId = btn.dataset.id;
                const habit = habits.find(x => x.id === habitId);
                if (habit && confirm(`Bạn có chắc muốn xóa thói quen "${habit.title}" không?`)) {
                    habits = habits.filter(x => x.id !== habitId);
                    saveHabitsToStorage();
                    renderHabits();
                    updateHabitStats();
                    showToast('Đã xóa thói quen thành công!', 'info');
                }
            });
        });


    }

    function toggleHabitCheckin(habitId) {
        const habit = habits.find(h => h.id === habitId);
        if (!habit) return;
        const todayStr = getTodayISO();
        if (!habit.history) habit.history = {};

        const isCurrentlyDone = Boolean(habit.history[todayStr]);
        habit.history[todayStr] = !isCurrentlyDone;

        const newStreak = calculateHabitStreak(habit);
        habit.streak = newStreak;
        habit.bestStreak = Math.max(habit.bestStreak || 0, newStreak);

        saveHabitsToStorage();
        renderHabits();
        updateHabitStats();

        if (!isCurrentlyDone) {
            // Vừa hoàn thành
            playBeepSound();
            fireConfettiBurst();
            showToast(`Tuyệt vời! Đã điểm danh "${habit.title}" (Chuỗi: ${newStreak} ngày 🔥)`, 'success');
        } else {
            showToast(`Đã hủy điểm danh hôm nay cho "${habit.title}"`, 'info');
        }
    }

    function openHabitModal(habitToEdit = null) {
        if (!habitModal) return;
        if (habitToEdit) {
            if (habitEditId) habitEditId.value = habitToEdit.id;
            if (habitTitleInput) habitTitleInput.value = habitToEdit.title || '';
            if (habitCategoryInput) habitCategoryInput.value = habitToEdit.category || 'Sức khỏe';
            if (habitFrequencyInput) habitFrequencyInput.value = habitToEdit.frequency || 'daily';
            if (habitTargetNote) habitTargetNote.value = habitToEdit.note || '';
            if (habitSelectedEmojiInput) habitSelectedEmojiInput.value = habitToEdit.emoji || '🌱';

            habitEmojiBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.emoji === (habitToEdit.emoji || '🌱'));
            });
            const titleEl = document.getElementById('habit-modal-title');
            if (titleEl) titleEl.textContent = 'Chỉnh Sửa Thói Quen';
        } else {
            if (habitForm) habitForm.reset();
            if (habitEditId) habitEditId.value = '';
            if (habitSelectedEmojiInput) habitSelectedEmojiInput.value = '🌱';
            habitEmojiBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.emoji === '🌱');
            });
            const titleEl = document.getElementById('habit-modal-title');
            if (titleEl) titleEl.textContent = 'Thêm Thói Quen Mới';
        }
        habitModal.classList.add('active');
        habitModal.setAttribute('aria-hidden', 'false');
        if (habitTitleInput) habitTitleInput.focus();
    }

    function closeHabitModal() {
        if (!habitModal) return;
        habitModal.classList.remove('active');
        habitModal.setAttribute('aria-hidden', 'true');
    }

    // Sự kiện Habit Tracker
    if (btnAddHabit) btnAddHabit.addEventListener('click', () => openHabitModal());
    if (btnCloseHabitModal) btnCloseHabitModal.addEventListener('click', closeHabitModal);
    if (btnCancelHabitModal) btnCancelHabitModal.addEventListener('click', closeHabitModal);
    if (habitModal) {
        habitModal.addEventListener('click', (e) => {
            if (e.target === habitModal) closeHabitModal();
        });
    }

    habitEmojiBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            habitEmojiBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (habitSelectedEmojiInput) habitSelectedEmojiInput.value = btn.dataset.emoji;
        });
    });

    if (habitSearchInput) {
        habitSearchInput.addEventListener('input', (e) => {
            currentHabitSearch = e.target.value.trim();
            renderHabits();
        });
    }

    document.querySelectorAll('.habit-filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.habit-filter-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentHabitFilter = btn.dataset.filter;
            renderHabits();
        });
    });

    if (habitForm) {
        habitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = habitTitleInput ? habitTitleInput.value.trim() : '';
            if (!title) return;

            const editId = habitEditId ? habitEditId.value.trim() : '';
            const category = habitCategoryInput ? habitCategoryInput.value : 'Sức khỏe';
            const frequency = habitFrequencyInput ? habitFrequencyInput.value : 'daily';
            const emoji = habitSelectedEmojiInput ? habitSelectedEmojiInput.value : '🌱';
            const note = habitTargetNote ? habitTargetNote.value.trim() : '';

            if (editId) {
                const idx = habits.findIndex(h => h.id === editId);
                if (idx !== -1) {
                    habits[idx] = {
                        ...habits[idx],
                        title,
                        category,
                        frequency,
                        emoji,
                        note
                    };
                    showToast('Đã cập nhật thói quen!', 'success');
                }
            } else {
                const newHabit = {
                    id: generateUniqueId('habit'),
                    title,
                    category,
                    frequency,
                    emoji,
                    note,
                    history: {},
                    streak: 0,
                    bestStreak: 0,
                    createdAt: getTodayISO()
                };
                habits.unshift(newHabit);
                showToast('Đã thêm thói quen mới!', 'success');
            }

            saveHabitsToStorage();
            closeHabitModal();
            renderHabits();
            updateHabitStats();
        });
    }

    // =========================================================================
    // 19. MODULE 04: QUICK NOTES & KNOWLEDGE BASE (GHI CHÚ & MARKDOWN)
    // =========================================================================
    const NOTES_STORAGE_KEY = 'personal_workspace_notes_v1';

    const DEFAULT_NOTES = [
        {
            id: 'note_def_01',
            title: '💡 Hướng dẫn sử dụng Personal Workspace 2.0',
            tags: ['Hướng dẫn', 'Hệ thống'],
            color: '#4F46E5',
            isPinned: true,
            content: '# Chào mừng đến với Personal Workspace 2.0! 🎉\n\nỨng dụng hỗ trợ tối đa năng suất cá nhân:\n- [x] **Quản lý công việc**: Phân loại theo Ma trận Eisenhower & Tìm kiếm bộ lọc thông minh\n- [x] **Thời gian**: Pomodoro Timer, Web Audio Sound chuông báo & Web Notification\n- [x] **Thói quen**: Streak Counter điểm danh hằng ngày và dải lịch sử 7 ngày\n- [x] **Ghi chú**: Soạn thảo Markdown với trình xem trước thời gian thực\n- [x] **Spatial 3D**: Nền không gian 3D tương tác sống động bằng Three.js\n\n> Hãy tập trung vào những mục tiêu quan trọng nhất hôm nay!',
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        },
        {
            id: 'note_def_02',
            title: '🚀 Kế hoạch phát triển bản thân tuần này',
            tags: ['Kế hoạch', 'Phát triển'],
            color: '#10B981',
            isPinned: false,
            content: '### Mục tiêu trọng tâm:\n- Duy trì chuỗi chạy bộ 30 phút mỗi ngày\n- Đọc 2 chương sách *Deep Work*\n- Thử nghiệm các tính năng mới của ứng dụng',
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }
    ];

    let notes = loadJSONFromStorage(NOTES_STORAGE_KEY, DEFAULT_NOTES);
    let currentNoteFilterTag = 'all';
    let currentNoteSearch = '';

    // DOM Elements for Notes
    const notesPinnedSection = document.getElementById('notes-pinned-section');
    const notesPinnedGrid = document.getElementById('notes-pinned-grid');
    const notesCardsGrid = document.getElementById('notes-cards-grid');
    const notesSearchInput = document.getElementById('notes-search-input');
    const notesTagPills = document.getElementById('notes-tag-pills');
    const btnAddNote = document.getElementById('btn-add-note');
    const noteModal = document.getElementById('note-modal');
    const noteForm = document.getElementById('note-form');
    const btnCloseNoteModal = document.getElementById('btn-close-note-modal');
    const btnCancelNoteModal = document.getElementById('btn-cancel-note-modal');
    const noteEditId = document.getElementById('note-edit-id');
    const noteTitleInput = document.getElementById('note-title-input');
    const noteTagsInput = document.getElementById('note-tags-input');
    const noteColorSelect = document.getElementById('note-color-select');
    const notePinCheckbox = document.getElementById('note-pin-checkbox');
    const noteContentInput = document.getElementById('note-content-input');
    const noteTabWrite = document.getElementById('note-tab-write');
    const noteTabPreview = document.getElementById('note-tab-preview');
    const noteEditorWrapper = document.getElementById('note-editor-wrapper');
    const notePreviewWrapper = document.getElementById('note-preview-wrapper');

    function saveNotesToStorage() {
        try {
            localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
        } catch(e) {}
    }

    function renderMarkdownToHTML(mdText) {
        if (!mdText) return '<em style="color: var(--text-muted);">Chưa có nội dung...</em>';
        let html = escapeHTML(mdText);

        // Code block
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        // Task checkboxes
        html = html.replace(/^- \[x\] (.*$)/gim, '<div style="display:flex;align-items:center;gap:0.35rem;"><input type="checkbox" checked disabled> <s>$1</s></div>');
        html = html.replace(/^- \[ \] (.*$)/gim, '<div style="display:flex;align-items:center;gap:0.35rem;"><input type="checkbox" disabled> <span>$1</span></div>');
        // Bullet lists
        html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
        // Bold & Italic
        html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
        // Blockquote
        html = html.replace(/^&gt; (.*$)/gim, '<blockquote style="border-left:3px solid var(--primary);padding-left:0.75rem;margin:0.5rem 0;color:var(--text-secondary);">$1</blockquote>');
        // Line breaks
        html = html.replace(/\n/g, '<br>');
        return html;
    }

    function renderNoteTags() {
        if (!notesTagPills) return;
        const allTags = new Set();
        notes.forEach(n => {
            if (Array.isArray(n.tags)) {
                n.tags.forEach(t => t && allTags.add(t.trim()));
            }
        });

        let pillsHtml = `<button type="button" class="note-tag-pill ${currentNoteFilterTag === 'all' ? 'active' : ''}" data-tag="all">Tất cả thẻ</button>`;
        allTags.forEach(t => {
            pillsHtml += `<button type="button" class="note-tag-pill ${currentNoteFilterTag === t ? 'active' : ''}" data-tag="${escapeHTML(t)}">#${escapeHTML(t)}</button>`;
        });
        notesTagPills.innerHTML = pillsHtml;

        notesTagPills.querySelectorAll('.note-tag-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                currentNoteFilterTag = btn.dataset.tag;
                renderNoteTags();
                renderNotes();
            });
        });
    }

    function renderNotes() {
        if (!notesCardsGrid) return;

        let filtered = notes.filter(n => {
            if (currentNoteFilterTag !== 'all') {
                if (!Array.isArray(n.tags) || !n.tags.includes(currentNoteFilterTag)) {
                    return false;
                }
            }
            if (currentNoteSearch) {
                const q = currentNoteSearch.toLowerCase();
                const matchTitle = (n.title || '').toLowerCase().includes(q);
                const matchContent = (n.content || '').toLowerCase().includes(q);
                const matchTag = Array.isArray(n.tags) && n.tags.some(t => t.toLowerCase().includes(q));
                if (!matchTitle && !matchContent && !matchTag) return false;
            }
            return true;
        });

        const pinnedNotes = filtered.filter(n => n.isPinned);
        const otherNotes = filtered.filter(n => !n.isPinned);

        function renderNoteCard(n) {
            const tagsHtml = (Array.isArray(n.tags) && n.tags.length > 0)
                ? `<div class="note-tags-row">${n.tags.map(t => `<span class="note-tag-badge">#${escapeHTML(t)}</span>`).join('')}</div>`
                : '';
            const previewHtml = renderMarkdownToHTML(n.content || '');
            const timeStr = n.updatedAt ? new Date(n.updatedAt).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

            return `
                <div class="note-card ${n.isPinned ? 'is-pinned' : ''}" style="--note-accent: ${n.color || '#4F46E5'};" data-id="${escapeHTML(n.id)}">
                    <div class="note-card-header">
                        <h3 class="note-card-title">${escapeHTML(n.title)}</h3>
                        <button type="button" class="note-pin-btn ${n.isPinned ? 'pinned' : ''} btn-toggle-pin" data-id="${escapeHTML(n.id)}" title="${n.isPinned ? 'Bỏ ghim' : 'Ghim lên đầu'}">
                            <i class="${n.isPinned ? 'ri-pushpin-2-fill' : 'ri-pushpin-2-line'}"></i>
                        </button>
                    </div>

                    ${tagsHtml}

                    <div class="note-content-preview">
                        ${previewHtml}
                    </div>

                    <div class="note-card-footer">
                        <span class="note-updated-time">${timeStr}</span>
                        <div class="note-card-actions">
                            <button type="button" class="btn-habit-icon btn-edit-note" data-id="${escapeHTML(n.id)}" title="Chỉnh sửa">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button type="button" class="btn-habit-icon btn-delete btn-delete-note" data-id="${escapeHTML(n.id)}" title="Xóa ghi chú">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        if (pinnedNotes.length > 0 && notesPinnedSection && notesPinnedGrid) {
            notesPinnedSection.style.display = 'block';
            notesPinnedGrid.innerHTML = pinnedNotes.map(renderNoteCard).join('');
        } else if (notesPinnedSection) {
            notesPinnedSection.style.display = 'none';
        }

        if (otherNotes.length > 0) {
            notesCardsGrid.innerHTML = otherNotes.map(renderNoteCard).join('');
        } else if (pinnedNotes.length === 0) {
            notesCardsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center;">
                    <div class="empty-icon" style="font-size: 3rem; margin-bottom: 0.5rem;">📝</div>
                    <h3 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.35rem;">Chưa có ghi chú nào</h3>
                    <p style="color: var(--text-muted); font-size: 0.88rem; max-width: 400px; margin: 0 auto 1rem;">
                        Hãy bấm nút <strong>"Tạo ghi chú mới"</strong> để ghi lại ý tưởng, kiến thức hoặc ghi nhớ công việc!
                    </p>
                </div>
            `;
        } else {
            notesCardsGrid.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">Tất cả ghi chú hiện tại đang được ghim ở phía trên.</p>`;
        }

        // Gắn sự kiện cho các nút trên thẻ ghi chú
        document.querySelectorAll('.btn-toggle-pin').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const noteId = btn.dataset.id;
                const note = notes.find(n => n.id === noteId);
                if (note) {
                    note.isPinned = !note.isPinned;
                    note.updatedAt = new Date().toISOString();
                    saveNotesToStorage();
                    renderNotes();
                    showToast(note.isPinned ? 'Đã ghim ghi chú lên đầu!' : 'Đã bỏ ghim ghi chú!', 'info');
                }
            });
        });

        document.querySelectorAll('.btn-edit-note').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const noteId = btn.dataset.id;
                const note = notes.find(n => n.id === noteId);
                if (note) openNoteModal(note);
            });
        });

        document.querySelectorAll('.btn-delete-note').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const noteId = btn.dataset.id;
                const note = notes.find(n => n.id === noteId);
                if (note && confirm(`Bạn có chắc muốn xóa ghi chú "${note.title}" không?`)) {
                    notes = notes.filter(n => n.id !== noteId);
                    saveNotesToStorage();
                    renderNotes();
                    renderNoteTags();
                    showToast('Đã xóa ghi chú!', 'info');
                }
            });
        });


    }

    function openNoteModal(noteToEdit = null) {
        if (!noteModal) return;
        // Chuyển về tab soạn thảo mặc định
        if (noteTabWrite && noteTabPreview) {
            noteTabWrite.classList.add('active');
            noteTabPreview.classList.remove('active');
            if (noteEditorWrapper) noteEditorWrapper.style.display = 'block';
            if (notePreviewWrapper) notePreviewWrapper.style.display = 'none';
        }

        if (noteToEdit) {
            if (noteEditId) noteEditId.value = noteToEdit.id;
            if (noteTitleInput) noteTitleInput.value = noteToEdit.title || '';
            if (noteTagsInput) noteTagsInput.value = Array.isArray(noteToEdit.tags) ? noteToEdit.tags.join(', ') : '';
            if (noteColorSelect) noteColorSelect.value = noteToEdit.color || '#4F46E5';
            if (notePinCheckbox) notePinCheckbox.checked = Boolean(noteToEdit.isPinned);
            if (noteContentInput) noteContentInput.value = noteToEdit.content || '';

            const titleEl = document.getElementById('note-modal-title');
            if (titleEl) titleEl.textContent = 'Chỉnh Sửa Ghi Chú';
        } else {
            if (noteForm) noteForm.reset();
            if (noteEditId) noteEditId.value = '';
            if (notePinCheckbox) notePinCheckbox.checked = false;
            const titleEl = document.getElementById('note-modal-title');
            if (titleEl) titleEl.textContent = 'Ghi Chú Mới';
        }

        noteModal.classList.add('active');
        noteModal.setAttribute('aria-hidden', 'false');
        if (noteTitleInput) noteTitleInput.focus();
    }

    function closeNoteModal() {
        if (!noteModal) return;
        noteModal.classList.remove('active');
        noteModal.setAttribute('aria-hidden', 'true');
    }

    // Tab chuyển đổi Soạn thảo / Xem trước
    if (noteTabWrite && noteTabPreview) {
        noteTabWrite.addEventListener('click', () => {
            noteTabWrite.classList.add('active');
            noteTabPreview.classList.remove('active');
            if (noteEditorWrapper) noteEditorWrapper.style.display = 'block';
            if (notePreviewWrapper) notePreviewWrapper.style.display = 'none';
        });

        noteTabPreview.addEventListener('click', () => {
            noteTabPreview.classList.add('active');
            noteTabWrite.classList.remove('active');
            if (noteEditorWrapper) noteEditorWrapper.style.display = 'none';
            if (notePreviewWrapper) {
                notePreviewWrapper.style.display = 'block';
                const text = noteContentInput ? noteContentInput.value : '';
                notePreviewWrapper.innerHTML = renderMarkdownToHTML(text);
            }
        });
    }

    if (btnAddNote) btnAddNote.addEventListener('click', () => openNoteModal());
    if (btnCloseNoteModal) btnCloseNoteModal.addEventListener('click', closeNoteModal);
    if (btnCancelNoteModal) btnCancelNoteModal.addEventListener('click', closeNoteModal);
    if (noteModal) {
        noteModal.addEventListener('click', (e) => {
            if (e.target === noteModal) closeNoteModal();
        });
    }

    if (notesSearchInput) {
        notesSearchInput.addEventListener('input', (e) => {
            currentNoteSearch = e.target.value.trim();
            renderNotes();
        });
    }

    if (noteForm) {
        noteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = noteTitleInput ? noteTitleInput.value.trim() : '';
            if (!title) return;

            const editId = noteEditId ? noteEditId.value.trim() : '';
            const rawTags = noteTagsInput ? noteTagsInput.value : '';
            const tags = rawTags.split(',').map(t => t.trim()).filter(Boolean);
            const color = noteColorSelect ? noteColorSelect.value : '#4F46E5';
            const isPinned = notePinCheckbox ? notePinCheckbox.checked : false;
            const content = noteContentInput ? noteContentInput.value : '';
            const nowISO = new Date().toISOString();

            if (editId) {
                const idx = notes.findIndex(n => n.id === editId);
                if (idx !== -1) {
                    notes[idx] = {
                        ...notes[idx],
                        title,
                        tags,
                        color,
                        isPinned,
                        content,
                        updatedAt: nowISO
                    };
                    showToast('Đã lưu thay đổi ghi chú!', 'success');
                }
            } else {
                const newNote = {
                    id: generateUniqueId('note'),
                    title,
                    tags,
                    color,
                    isPinned,
                    content,
                    createdAt: nowISO,
                    updatedAt: nowISO
                };
                notes.unshift(newNote);
                showToast('Đã tạo ghi chú mới!', 'success');
            }

            saveNotesToStorage();
            closeNoteModal();
            renderNotes();
            renderNoteTags();
        });
    }

    // =========================================================================
    // ĐĂNG KÝ SERVICE WORKER & XỬ LÝ CÀI ĐẶT PWA
    // =========================================================================
    let deferredInstallPrompt = null;
    const btnInstallPwa = document.getElementById('btn-install-pwa');
    const pwaStatusText = document.getElementById('pwa-status-text');

    // 1. Kiểm tra trạng thái đang chạy standalone (đã cài đặt làm app)
    const isAppStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    if (isAppStandalone && pwaStatusText) {
        pwaStatusText.textContent = 'Ứng dụng đã được cài đặt và đang chạy ở chế độ App độc lập.';
        if (btnInstallPwa) btnInstallPwa.style.display = 'none';
    }

    // 2. Bắt sự kiện beforeinstallprompt để hiển thị nút cài đặt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;

        if (btnInstallPwa && !isAppStandalone) {
            btnInstallPwa.style.display = 'inline-flex';
            if (pwaStatusText) {
                pwaStatusText.textContent = 'Sẵn sàng cài đặt ứng dụng lên máy tính hoặc điện thoại của bạn.';
            }
        }
    });

    // 3. Xử lý khi người dùng nhấn nút Cài đặt App
    if (btnInstallPwa) {
        btnInstallPwa.addEventListener('click', async () => {
            if (!deferredInstallPrompt) {
                showToast('Để cài đặt, bạn cũng có thể nhấn biểu tượng Cài đặt trên thanh địa chỉ trình duyệt!', 'info');
                return;
            }

            deferredInstallPrompt.prompt();
            const choiceResult = await deferredInstallPrompt.userChoice;

            if (choiceResult && choiceResult.outcome === 'accepted') {
                showToast('Đang cài đặt Personal Workspace 2.0...', 'success');
                btnInstallPwa.style.display = 'none';
                if (pwaStatusText) {
                    pwaStatusText.textContent = 'Ứng dụng đã được cài đặt thành công.';
                }
            }
            deferredInstallPrompt = null;
        });
    }

    // 4. Lắng nghe sự kiện cài đặt thành công
    window.addEventListener('appinstalled', () => {
        if (btnInstallPwa) btnInstallPwa.style.display = 'none';
        if (pwaStatusText) {
            pwaStatusText.textContent = 'Ứng dụng đã được cài đặt thành công trên thiết bị.';
        }
        showToast('Chúc mừng! Personal Workspace 2.0 đã được cài đặt thành app.', 'success');
    });

    // 5. Đăng ký Service Worker an toàn
    function registerServiceWorker() {
        if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => {
                    console.log('[PWA] Service Worker đăng ký thành công:', reg.scope);
                })
                .catch(err => {
                    console.warn('[PWA] Đăng ký Service Worker thất bại:', err);
                });
        }
    }

    if (document.readyState === 'complete') {
        registerServiceWorker();
    } else {
        window.addEventListener('load', registerServiceWorker);
    }

    // =========================================================================
    // KHỞI TẠO HỆ THỐNG BAN ĐẦU
    // =========================================================================
    initTheme();
    updateNotificationUI();
    updateActiveFiltersBadge();
    renderHabits();
    updateHabitStats();
    renderNotes();
    renderNoteTags();
});
