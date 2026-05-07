import emailjs from '@emailjs/browser';
import { formatDateTimeBR } from '../utils/formatters';

const createSafeEmailPayload = (resultsHistory) => {
  return resultsHistory.map(item => {
    let totalItems;
    let dataPreview;
    let wasTruncated;
    let previewLimit;

    if (item.moduleName === "Municípios" && Array.isArray(item.data)) {
      // Municípios: prévia de até 10
      totalItems = item.data.length;
      previewLimit = 10;
      dataPreview = item.data.slice(0, previewLimit);
      wasTruncated = item.data.length > previewLimit;

    } else if (item.moduleName === "Estados" && Array.isArray(item.data)) {
      // Estados: enviar os 27 estados (pequeno o suficiente)
      totalItems = item.data.length;
      previewLimit = 27;
      dataPreview = item.data.slice(0, previewLimit);
      wasTruncated = false;

    } else if (item.data && Array.isArray(item.data.cities)) {
      // DDD: prévia de até 15 cidades
      totalItems = item.data.cities.length;
      previewLimit = 15;
      dataPreview = {
        ...item.data,
        cities: item.data.cities.slice(0, previewLimit)
      };
      wasTruncated = item.data.cities.length > previewLimit;

    } else if (item.moduleName === "Feriados" && Array.isArray(item.data)) {
      // Feriados: prévia de até 20
      totalItems = item.data.length;
      previewLimit = 20;
      dataPreview = item.data.slice(0, previewLimit);
      wasTruncated = item.data.length > previewLimit;

    } else if (item.moduleName === "CEP") {
      // CEP: enviar completo, pois é pequeno
      totalItems = null;
      dataPreview = item.data;
      wasTruncated = false;
      previewLimit = null;

    } else if (Array.isArray(item.data)) {
      // Genérico
      totalItems = item.data.length;
      previewLimit = 20;
      dataPreview = item.data.slice(0, previewLimit);
      wasTruncated = item.data.length > previewLimit;

    } else {
      totalItems = null;
      dataPreview = item.data;
      wasTruncated = false;
    }

    return {
      moduleName: item.moduleName,
      queryLabel: item.queryLabel,
      summaryText: item.summaryText,
      createdAt: item.createdAt,
      totalItems,
      wasTruncated,
      previewLimit,
      dataPreview
    };
  });
};

const createEmailSummary = (resultsHistory) => {
  const formatFeriadoDate = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
  };

  let summaryParts = resultsHistory.map((item, index) => {
    let block = `${index + 1}. [${item.moduleName}] ${item.queryLabel}\n${item.summaryText}`;

    if (item.moduleName === "CEP" && item.data) {
      // CEP: endereço completo
      const d = item.data;
      if (d.street || d.neighborhood || d.city || d.state) {
        block += `\nEndereço: ${d.street || 'N/A'}, ${d.neighborhood || 'N/A'}, ${d.city || 'N/A'} - ${d.state || 'N/A'}.`;
      }
      if (d.service) {
        block += `\nServiço: ${d.service}.`;
      }
    }
    else if (item.moduleName === "DDD" && item.data && Array.isArray(item.data.cities)) {
      // DDD: até 15 cidades
      const cities = item.data.cities;
      block += `\nUF: ${item.data.state || 'N/A'}`;
      block += `\nTotal de cidades: ${cities.length}`;
      if (cities.length > 0) {
        const previewCities = cities.slice(0, 15).join(', ');
        const remainder = cities.length - 15;
        block += `\nCidades: ${previewCities}`;
        if (remainder > 0) {
          block += `\n...e mais ${remainder} cidade(s).`;
        }
      }
    }
    else if (item.moduleName === "Feriados" && Array.isArray(item.data)) {
      // Feriados: até 20
      const feriados = item.data;
      const preview = feriados.slice(0, 20);
      block += `\nFeriados:`;
      preview.forEach(f => {
        block += `\n- ${formatFeriadoDate(f.date)} - ${f.name}`;
      });
      if (feriados.length > 20) {
        block += `\n...e mais ${feriados.length - 20} feriado(s).`;
      }
    }
    else if (item.moduleName === "Estados" && Array.isArray(item.data)) {
      // Estados: listar todos os 27
      const estados = item.data;
      block += `\nTotal de estados: ${estados.length}`;
      if (estados.length > 0) {
        block += `\nLista de estados:`;
        estados.forEach(e => {
          if (e.sigla && e.nome) {
            block += `\n- ${e.sigla} - ${e.nome}`;
          }
        });
      }
    }
    else if (item.moduleName === "Municípios" && Array.isArray(item.data)) {
      // Municípios: até 10, informar total e truncamento
      const municipios = item.data;
      block += `\nTotal de municípios: ${municipios.length}`;
      if (municipios.length > 0) {
        const preview = municipios.slice(0, 10);
        block += `\nMunicípios (prévia):`;
        preview.forEach(m => {
          if (m.nome) {
            const ibgeStr = m.codigo_ibge ? ` (IBGE: ${m.codigo_ibge})` : '';
            block += `\n- ${m.nome}${ibgeStr}`;
          }
        });
        if (municipios.length > 10) {
          block += `\n...e mais ${municipios.length - 10} município(s).`;
        }
      }
    }

    return block;
  });

  const observacao =
    "\n\nObservação: consultas grandes são enviadas com prévia reduzida por segurança. " +
    "O JSON completo permanece disponível na tela Exportar do sistema.";

  return summaryParts.join('\n\n') + observacao;
};

export const sendExportEmail = async ({ toName, toEmail, subject, message, resultsHistory }) => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_EXPORT_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) {
    throw new Error("Configuração do EmailJS ausente. Verifique o arquivo .env.");
  }

  const templateParams = {
    to_name: toName,
    to_email: toEmail,
    reply_to: toEmail,
    subject: subject,
    module_name: "Histórico de consultas",
    query_label: `${resultsHistory.length} consulta(s) exportada(s)`,
    sent_at: formatDateTimeBR(new Date().toISOString()),
    summary_text: createEmailSummary(resultsHistory),
    message: message || "Nenhuma mensagem adicional.",
    json_payload: JSON.stringify(createSafeEmailPayload(resultsHistory), null, 2)
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey: publicKey,
    });
    return response;
  } catch (error) {
    throw new Error("Falha ao conectar com o serviço de e-mail.", { cause: error });
  }
};
