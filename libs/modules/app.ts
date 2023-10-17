import { networkInterfaces } from 'os';

/**
 * 获取当前服务的 Ipv4 地址
 */
export function getIpv4Address(): string {
  const interfaces = networkInterfaces();

  for (const devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }

  return '0.0.0.0';
}
