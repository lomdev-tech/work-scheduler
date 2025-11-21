/**
 * 主应用入口
 * Main Application Entry
 */

import { getAllTasks, addTask, updateTask, deleteTask } from './storage.js';
import { detectConflicts, sortTasks, filterTodayTasks, filterWeekTasks, filterByDate, checkNewTaskConflicts } from './scheduler.js';
import { showModal, hideModal, initModal } from './modal.js';
import { exportToJSON, exportToMarkdown } from './export.js';
import { renderTaskList, updateStats, updateViewTitle, updateNavButtons, initExportMenu } from './ui.js';

// 应用状态
let currentView = 'today'; // 'today' | 'week' | 'all'
let currentDateFilter = null;

/**
 * 初始化应用
 */
function init() {
    // 初始化模态弹窗
    initModal(handleTaskSubmit);
    
    // 初始化导航按钮
    initNavButtons();
    
    // 初始化日期选择器
    initDatePicker();
    
    // 初始化快速筛选按钮
    initQuickFilters();
    
    // 初始化添加按钮
    initAddButton();
    
    // 初始化导出菜单
    initExportMenu(handleExportJSON, handleExportMarkdown);
    
    // 加载并渲染任务
    loadAndRenderTasks();
}

/**
 * 初始化导航按钮
 */
function initNavButtons() {
    const navButtons = document.querySelectorAll('.nav-btn[data-view]');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
        });
    });
}

/**
 * 初始化日期选择器
 */
function initDatePicker() {
    const dateInput = document.getElementById('dateFilter');
    if (!dateInput) return;
    
    // 设置默认值为今天
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    
    dateInput.addEventListener('change', (e) => {
        if (e.target.value) {
            currentDateFilter = e.target.value;
            currentView = 'all'; // 切换到全部视图以便显示筛选结果
            updateNavButtons('all');
            loadAndRenderTasks();
        }
    });
}

/**
 * 初始化快速筛选按钮
 */
function initQuickFilters() {
    const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');
    quickFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            handleQuickFilter(filter);
        });
    });
}

/**
 * 处理快速筛选
 * @param {string} filter - 筛选类型
 */
function handleQuickFilter(filter) {
    const dateInput = document.getElementById('dateFilter');
    
    switch (filter) {
        case 'today':
            currentView = 'today';
            updateNavButtons('today');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.value = today;
                currentDateFilter = null;
            }
            break;
        case 'tomorrow':
            currentView = 'all';
            updateNavButtons('all');
            if (dateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateInput.value = tomorrow.toISOString().split('T')[0];
                currentDateFilter = tomorrow.toISOString().split('T')[0];
            }
            break;
        case 'week':
            currentView = 'week';
            updateNavButtons('week');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.value = today;
                currentDateFilter = null;
            }
            break;
    }
    
    loadAndRenderTasks();
}

/**
 * 初始化添加按钮
 */
function initAddButton() {
    const addBtn = document.getElementById('addTaskBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            showModal();
        });
    }
}

/**
 * 切换视图
 * @param {string} view - 视图类型
 */
function switchView(view) {
    currentView = view;
    currentDateFilter = null;
    
    // 重置日期选择器
    const dateInput = document.getElementById('dateFilter');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
    
    updateNavButtons(view);
    loadAndRenderTasks();
}

/**
 * 加载并渲染任务
 */
function loadAndRenderTasks() {
    let tasks = getAllTasks();
    
    // 根据当前视图过滤任务
    switch (currentView) {
        case 'today':
            tasks = filterTodayTasks(tasks);
            updateViewTitle('今日日程');
            break;
        case 'week':
            tasks = filterWeekTasks(tasks);
            updateViewTitle('本周日程');
            break;
        case 'all':
            if (currentDateFilter) {
                tasks = filterByDate(tasks, currentDateFilter);
                const date = new Date(currentDateFilter);
                updateViewTitle(`${date.getMonth() + 1}月${date.getDate()}日 日程`);
            } else {
                updateViewTitle('全部日程');
            }
            break;
    }
    
    // 排序任务
    tasks = sortTasks(tasks);
    
    // 检测冲突
    tasks = detectConflicts(tasks);
    
    // 统计冲突数量
    const conflictCount = tasks.filter(task => task.conflicts && task.conflicts.length > 0).length;
    
    // 更新统计信息
    updateStats(tasks.length, conflictCount);
    
    // 渲染任务列表
    renderTaskList(tasks, handleEditTask, handleDeleteTask);
}

/**
 * 处理任务提交（新增或编辑）
 * @param {Object} formData - 表单数据
 */
function handleTaskSubmit(formData) {
    // 检查时间冲突
    const allTasks = getAllTasks();
    const conflicts = checkNewTaskConflicts(allTasks, formData);
    
    if (conflicts.length > 0) {
        const conflictCount = conflicts.length;
        if (!confirm(`检测到 ${conflictCount} 个时间冲突，是否仍要保存？`)) {
            return;
        }
    }
    
    if (formData.id) {
        // 编辑任务
        updateTask(formData.id, {
            name: formData.name,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            priority: formData.priority,
            description: formData.description
        });
    } else {
        // 新增任务
        addTask({
            name: formData.name,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            priority: formData.priority,
            description: formData.description
        });
    }
    
    // 重新加载并渲染
    loadAndRenderTasks();
}

/**
 * 处理编辑任务
 * @param {Object} task - 任务对象
 */
function handleEditTask(task) {
    showModal(task);
}

/**
 * 处理删除任务
 * @param {string} taskId - 任务ID
 */
function handleDeleteTask(taskId) {
    deleteTask(taskId);
    loadAndRenderTasks();
}

/**
 * 处理 JSON 导出
 */
function handleExportJSON() {
    const tasks = getAllTasks();
    exportToJSON(tasks);
}

/**
 * 处理 Markdown 导出
 */
function handleExportMarkdown() {
    let tasks = getAllTasks();
    tasks = detectConflicts(tasks);
    exportToMarkdown(tasks);
}

// 当 DOM 加载完成后初始化应用
document.addEventListener('DOMContentLoaded', init);

