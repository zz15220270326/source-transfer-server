import {
  existsSync,
  readdirSync,
  mkdirSync
} from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

import { removeDirectory } from './fsExtensions';

import * as paths from '../../configs/paths';

/**
 * 初始化临时文件的路径
 */
export function initTargetDir() {
  if (existsSync(paths.targetDir)) {
    // 1. 将原来的 mp4 文件拷贝到对应的 videos 文件夹里面
    const prevVideoFiles: string[] = readdirSync(paths.targetDir, 'utf8').filter(file => file.endsWith('.mp4'));
    prevVideoFiles.forEach(mp4File => {
      const mp4FilePath: string = join(paths.targetDir, mp4File);
      
      if (!existsSync(join(paths.videoDir, mp4File))) {
        execSync(`cp -r ${mp4FilePath} ${paths.videoDir}`);
      }
    });
    // 2. 删除掉原来的 target 文件夹
    removeDirectory(paths.targetDir);
  } else {
    mkdirSync(paths.targetDir);
  }
}

/**
 * 初始化源文件夹路径
 */
export function initOriginDir() {
  if (existsSync(paths.originDir)) {
    console.log(`删除原文件夹：%s`, paths.originDir);
    removeDirectory(paths.originDir);
  } else {
    console.log(`重新创建文件夹：%s`, paths.originDir);
    mkdirSync(paths.originDir);
  }
}