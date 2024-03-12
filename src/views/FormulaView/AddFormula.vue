<script setup lang="ts">
import { ref, computed, onUpdated, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { setFormula } from '@/api/formula'

const props = defineProps(['drawerVisible', 'closeVariety'])
const formRef = ref<FormInstance>()
const typeOptions = [
    {
        value: 'stats',
        label: '属性',
    },
    {
        value: 'func',
        label: '方法',
    }
];
const form = reactive({
    en_title: '',
    cn_title: '',
    tags: [],
    intro: '',
    type: 'func',
    variety: [
        {
            argument: [],
            return: '',
            remark: '',
        }
    ],
    example: ''
});

const addVariety = () => form.variety.push({
    argument: [],
    return: '',
    remark: '',
})

const cancelClick = () => props.closeVariety();
const confirmClick = (formEl: FormInstance) => {
    const variety = JSON.stringify(form.variety.filter((_) => _.argument.length || _.return));
    const tags = JSON.stringify(form.tags);
    const data = { ...form, tags, variety };
    setFormula(data).then(({ data }: any) => {
        if (data) {
            formEl.resetFields();
            form.variety = [{
                argument: [],
                return: '',
                remark: '',
            }];
        };
    });
};



</script>

<template>
    <el-drawer :model-value="props.drawerVisible" direction="btt" :size="520" @close="cancelClick">
        <template #header>
            <h4>添加新笔记</h4>
        </template>
        <template #default>
            <el-form ref="formRef" :model="form">
                <el-row :gutter="12">
                    <el-col :span="11">
                        <el-form-item label="标题" prop="en_title">
                            <el-input v-model="form.en_title" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="副标题(中文)" prop="cn_title">
                            <el-input v-model="form.cn_title" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-col :span="23">
                    <el-form-item label="描述" prop="intro">
                        <el-input v-model="form.intro" />
                    </el-form-item>
                </el-col>
                <el-row :gutter="12">
                    <el-col :span="7">
                        <el-form-item label="标签" prop="tags">
                            <el-select v-model="form.tags" multiple filterable allow-create default-first-option
                                :reserve-keyword="false" placeholder=" " style="width: 240px">
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-form-item label="附加类型" prop="type">
                        <el-radio-group v-model="form.type">
                            <el-radio :value="sub.value" v-for="sub in typeOptions" :key="sub.value">{{ sub.label
                                }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-col :span="23">
                    <el-form-item label="例子" prop="example">
                        <el-input v-model="form.example" :rows="6" type="textarea" />
                    </el-form-item>
                </el-col>
                <div v-if="form.type === 'func'">
                    <el-row :gutter="12" v-for="(_, i) in form.variety" :key="i" prop="variety">
                        <el-col :span="7">
                            <el-form-item label="参数" prop="argument">
                                <el-select v-model="_.argument" multiple filterable allow-create default-first-option
                                    :reserve-keyword="false" placeholder=" " style="width: 240px">
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="返回值" prop="return">
                                <el-input v-model="_.return" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="注" prop="remark">
                                <el-input v-model="_.remark" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-button style="width: 92.3%;margin-left: 36px;" @click="addVariety">添加重载</el-button>
                </div>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">cancel</el-button>
                <el-button type="primary" @click="confirmClick(formRef)">confirm</el-button>
            </div>
        </template>
    </el-drawer>
</template>
